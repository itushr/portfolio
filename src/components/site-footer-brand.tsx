"use client"

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"

const VIEWBOX_WIDTH = 1410

export function SiteFooterInteractiveLogotype() {
  const shouldReduceMotion = useReducedMotion()

  const gradientX1Raw = useMotionValue(0.5)
  const gradientX1 = useSpring(
    useTransform(gradientX1Raw, [0, 1], [0, VIEWBOX_WIDTH]),
    {
      stiffness: 150,
      damping: 25,
    }
  )

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return

    const containerRect = event.currentTarget.getBoundingClientRect()
    gradientX1Raw.set(
      (event.clientX - containerRect.left) / containerRect.width
    )
  }

  const handleMouseLeave = () => {
    if (shouldReduceMotion) return
    gradientX1Raw.set(0.5)
  }

  return (
    <div className="screen-line-bottom after:z-1 after:bg-foreground/15">
      <div
        className="overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex w-full translate-y-[37.5%] items-center justify-center">
          <svg
            className="container size-1/2"
            viewBox="0 0 1200 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M 95 30 H 160 V 0 H 95 V 260 H 65 V 0 H 0 V 30 Z M 330 230 H 360 V 0 H 330 V 260 H 230 V 0 H 200 V 230 Z M 530 30 V 60 H 560 V 30 H 400 V 115 H 530 V 260 H 430 V 200 H 400 V 230 H 560 V 145 H 430 V 0 H 530 Z M 730 115 H 760 V 0 H 730 V 260 H 760 V 145 H 600 V 260 H 630 V 0 H 600 V 115 H 730 M 930 30 V 260 H 960 V 145 H 800 V 260 H 830 V 30 H 799 V 115 H 960 V 30 H 830 V 0 H 930 Z M 1130 30 V 85 H 1160 V 30 H 1000 V 115 H 1070 V 145 H 1000 V 260 H 1030 V 0 H 1130 Z M 1070 145 V 175 H 1100 V 205 H 1129 V 260 H 1160 V 205 H 1130 V 175 H 1100 V 145 Z M 1130 85 V 115 H 1070 V 85 Z"
              fill="url(#paint0_linear_1145_73)"
            />
            <path
              className="stroke-foreground/10"
              d="M 95 30 H 160 V 0 H 95 V 260 H 65 V 0 H 0 V 30 Z M 330 230 H 360 V 0 H 330 V 260 H 230 V 0 H 200 V 230 Z M 530 30 V 60 H 560 V 30 H 400 V 115 H 530 V 260 H 430 V 200 H 400 V 230 H 560 V 145 H 430 V 0 H 530 Z M 730 115 H 760 V 0 H 730 V 260 H 760 V 145 H 600 V 260 H 630 V 0 H 600 V 115 H 730 M 930 30 V 260 H 960 V 145 H 800 V 260 H 830 V 30 H 799 V 115 H 960 V 30 H 830 V 0 H 930 Z M 1130 30 V 85 H 1160 V 30 H 1000 V 115 H 1070 V 145 H 1000 V 260 H 1030 V 0 H 1130 Z M 1070 145 V 175 H 1100 V 205 H 1129 V 260 H 1160 V 205 H 1130 V 175 H 1100 V 145 Z M 1130 85 V 115 H 1070 V 85 Z"
              strokeWidth="2"
            />
            <defs>
              <motion.linearGradient
                id="paint0_linear_1145_73"
                x1={gradientX1}
                y1="1"
                x2="705"
                y2="257"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.625"
                  stopColor="var(--foreground)"
                  stopOpacity="0"
                />
                <stop offset="1" stopColor="var(--foreground)" />
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 left-1/2 hidden h-px w-[50%] max-w-full -translate-x-1/2 dark:block"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0) 0%, rgba(228, 228, 231, 0.3) 50%, rgba(0, 0, 0, 0) 100%)",
        }}
        aria-hidden
      />
    </div>
  )
}
