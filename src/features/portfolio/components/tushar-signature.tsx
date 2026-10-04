"use client"

import { useEffect, useRef } from "react"
import { useSpring, type MotionValue } from "motion/react" // or "framer-motion"

const D =
  "M211 110 92 563M22 328 403 262C330 506 370 717 577 261L521 567M867 199C337 534 1181 226 766 526M1166 20C1130.3333 180 879 655 1059 500 1537-146 1001 840 1500 398 1600 303 1626 278 1738 248 1470 281 1353 791 1749 261 1623 707 1957 393 1961 307 1953.6667 382.6667 1956 450 1939 534 1942 444 1963 232 2185 187"

// one <path> per stroke, so each stroke can be revealed on its own
const STROKES = D.split(/(?=M)/)

const VIEW_W = 2205
const FULL = VIEW_W + 60 // cursor x that means "everything is drawn"

type Table = { xs: number[]; ts: number[] }

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

function Stroke({ d, x }: { d: string; x: MotionValue<number> }) {
  const ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const table = buildTable(el)
    const apply = (cx: number) => {
      el.style.strokeDashoffset = String(1 - sample(table, cx))
    }
    apply(x.get())
    return x.on("change", apply) // no React re-renders while drawing
  }, [x])

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
  // Spring gives the "pen catching up with the hand" feel
  const x = useSpring(FULL, { stiffness: 260, damping: 32, mass: 0.6 })

  function moveTo(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current
    const ctm = svg?.getScreenCTM()
    if (!svg || !ctm) return
    // getScreenCTM accounts for the -rotate-6, so x is in viewBox units
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    x.set(pt.matrixTransform(ctm.inverse()).x)
  }

  return (
    <div className="flex h-60 items-center justify-center">
      <svg
        ref={svgRef}
        className="w-2/3 -rotate-6"
        viewBox={`0 0 ${VIEW_W} 594`}
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        xmlns="http://www.w3.org/2000/svg"
        onPointerEnter={moveTo}
        onPointerMove={moveTo}
        onPointerLeave={() => x.set(FULL)} // finish the signature when the cursor leaves
      >
        {STROKES.map((d, i) => (
          <Stroke key={i} d={d} x={x} />
        ))}
      </svg>
    </div>
  )
}
