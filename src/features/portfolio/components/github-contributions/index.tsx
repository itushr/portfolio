import { Suspense } from "react"

import { getGitHubContributions } from "@/features/portfolio/data/github-contributions"
import { getLeetCodeContributions } from "@/features/portfolio/data/leetcode-contributions"

import { Panel } from "../panel"
import {
  ContributionsClient,
  type ContributionPlatform,
} from "./contributions-client"
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export function GitHubContributions({
  switchable = true,
  defaultPlatform = "github",
}: {
  switchable?: boolean
  defaultPlatform?: ContributionPlatform
} = {}) {
  const githubContributions = getGitHubContributions()

  if (!switchable) {
    return (
      <Panel className="screen-line-top-border">
        <h2 className="sr-only">GitHub contributions</h2>

        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={githubContributions} />
        </Suspense>
      </Panel>
    )
  }

  const leetcodeContributions = getLeetCodeContributions()

  return (
    <Panel className="screen-line-top-border">
      <h2 className="sr-only">Activity contributions</h2>

      <ContributionsClient
        githubContributions={githubContributions}
        leetcodeContributions={leetcodeContributions}
        defaultPlatform={defaultPlatform}
      />
    </Panel>
  )
}

export const Contributions = GitHubContributions
export { ContributionsClient }
