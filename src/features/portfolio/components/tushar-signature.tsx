"use client"

import { useCallback, useEffect, useRef, type RefObject } from "react"
import { useMotionValue, useSpring, type MotionValue } from "motion/react"

const D =
  "M211 110 92 563M22 328 403 262C330 506 370 717 577 261L521 567M867 199C337 534 1181 226 766 526M1166 20C1130.3333 180 879 655 1059 500 1537-146 1001 840 1500 398 1600 303 1626 278 1738 248 1470 281 1353 791 1749 261 1623 707 1957 393 1961 307 1953.6667 382.6667 1956 450 1939 534 1942 444 1963 232 2185 187"

// one <path> per stroke, so each stroke can be revealed on its own
const STROKES = D.split(/(?=M)/)

const VIEW_W = 2205
const FULL = VIEW_W + 60 // cursor x that means "everything is drawn"

type Table = { xs: number[]; ts: number[] }
type StrokeInfo = { el: SVGPathElement; table: Table; total: number }
type Registry = RefObject<(StrokeInfo | undefined)[]>

/**
 * Samples a stroke and builds a lookup: cursor x -> fraction of the stroke drawn.
 * Uses the running max of x so that strokes which curl back (loops, the "s")
 * don't un-draw themselves while the cursor keeps moving right.
 */
function buildTable(el: SVGPathElement): Table {
  const N = 300
  const total = el.getTotalLength()
  const px = Array.from(
    { length: N + 1 },
    (_, i) => el.getPointAtLength((total * i) / N).x
  )

  // net-leftward stroke (the T's stem): spread it linearly across its x-range
  if (px[N] < px[0]) {
    return { xs: [Math.min(...px), Math.max(...px)], ts: [0, 1] }
  }

  const xs: number[] = []
  const ts: number[] = []
  let max = px[0]
  px.forEach((x, i) => {
    max = Math.max(max, x)
    xs.push(max + i * 1e-4) // keep strictly increasing
    ts.push(i / N)
  })
  return { xs, ts }
}

function sample({ xs, ts }: Table, x: number) {
  const last = xs.length - 1
  if (x <= xs[0]) return 0
  if (x >= xs[last]) return 1
  let lo = 0
  let hi = last
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (xs[mid] <= x) lo = mid
    else hi = mid
  }
  const k = (x - xs[lo]) / (xs[hi] - xs[lo])
  return ts[lo] + k * (ts[hi] - ts[lo])
}

function Stroke({
  d,
  index,
  x,
  onRegister,
}: {
  d: string
  index: number
  x: MotionValue<number>
  onRegister: (index: number, info: StrokeInfo) => void
}) {
  const ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const table = buildTable(el)

    onRegister(index, {
      el,
      table,
      total: el.getTotalLength(),
    })

    const apply = (cx: number) => {
      el.style.strokeDashoffset = String(1 - sample(table, cx))
    }

    apply(x.get())

    const off = x.on("change", apply)

    return () => {
      off()
    }
  }, [x, index, onRegister])

  return (
    <path
      ref={ref}
      d={d}
      pathLength={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ strokeDasharray: "1 2" }}
    />
  )
}

export function TusharSignature() {
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRef = useRef<SVGLineElement>(null)
  const registry: Registry = useRef([])
  const hovering = useRef(false)
  const onRegister = useCallback((index: number, info: StrokeInfo) => {
    registry.current[index] = info
  }, [])

  // x: springy "pen" position that drives the drawing
  // px / py: the raw cursor position, in viewBox units
  const x = useSpring(FULL, { stiffness: 260, damping: 32, mass: 0.6 })
  const px = useMotionValue(0)
  const py = useMotionValue(0)

  // Tether: from the end of the drawn part to the live cursor
  useEffect(() => {
    const line = lineRef.current
    if (!line) return

    const update = () => {
      const strokes = registry.current
      const cx = x.get()

      // the stroke being drawn right now = the last one that has started
      let active: StrokeInfo | undefined
      let t = 0
      for (let i = strokes.length - 1; i >= 0; i--) {
        const s = strokes[i]
        if (!s) continue
        const v = sample(s.table, cx)
        if (v > 0) {
          active = s
          t = v
          break
        }
      }

      if (!active || !hovering.current) {
        line.style.opacity = "0"
        return
      }

      const tip = active.el.getPointAtLength(active.total * t)
      line.setAttribute("x1", String(tip.x))
      line.setAttribute("y1", String(tip.y))
      line.setAttribute("x2", String(px.get()))
      line.setAttribute("y2", String(py.get()))
      line.style.opacity = "1"
    }

    const offs = [
      x.on("change", update),
      px.on("change", update),
      py.on("change", update),
    ]
    return () => offs.forEach((off) => off())
  }, [x, px, py])

  function moveTo(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!svg || !ctm) return
    // getScreenCTM accounts for the -rotate-6, so coordinates are in viewBox units
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const p = pt.matrixTransform(ctm.inverse())
    hovering.current = true
    px.set(p.x)
    py.set(p.y)
    x.set(p.x)
  }

  function leave() {
    hovering.current = false
    if (lineRef.current) lineRef.current.style.opacity = "0"
    x.set(FULL)
  }

  return (
    <div className="flex h-60 items-center justify-center">
      <svg
        ref={svgRef}
        className="w-10/12 -rotate-6 cursor-crosshair p-15"
        viewBox={`0 0 ${VIEW_W} 594`}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        xmlns="http://www.w3.org/2000/svg"
        onPointerEnter={moveTo}
        onPointerMove={moveTo}
        onPointerLeave={leave}
      >
        {STROKES.map((d, i) => (
          <Stroke key={i} d={d} index={i} x={x} onRegister={onRegister} />
        ))}
        <line
          ref={lineRef}
          strokeLinecap="round"
          style={{ opacity: 0, transition: "opacity 150ms" }}
        />
      </svg>
    </div>
  )
}
