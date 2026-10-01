import { Suspense } from "react"

import { getLeetCodeContributions } from "@/features/portfolio/data/leetcode-contributions"

import { Panel } from "../panel"
import {
  LeetCodeContributionFallback,
  LeetCodeContributionGraph,
} from "./graph"

export function LeetCodeContributions() {
  const contributions = getLeetCodeContributions()

  return (
    <Panel className="screen-line-top-border">
      <h2 className="sr-only">LeetCode contributions</h2>

      <Suspense fallback={<LeetCodeContributionFallback />}>
        <LeetCodeContributionGraph contributions={contributions} />
      </Suspense>
    </Panel>
  )
}
