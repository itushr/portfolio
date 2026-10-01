"use client"

import { Suspense, useState } from "react"

import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { GitHubIcon, LeetCodeIcon } from "@/components/icons"
import type { Activity } from "@/registry/components/contribution-graph"

import {
  LeetCodeContributionFallback,
  LeetCodeContributionGraph,
} from "../leetcode-contributions/graph"
import { GitHubContributionFallback, GitHubContributionGraph } from "./graph"

export type ContributionPlatform = "github" | "leetcode"

export function ContributionsClient({
  githubContributions,
  leetcodeContributions,
  defaultPlatform = "github",
}: {
  githubContributions: Promise<Activity[]>
  leetcodeContributions: Promise<Activity[]>
  defaultPlatform?: ContributionPlatform
}) {
  const [platform, setPlatform] =
    useState<ContributionPlatform>(defaultPlatform)

  return (
    <Tabs
      value={platform}
      onValueChange={(val) => setPlatform(val as ContributionPlatform)}
      className="gap-0"
    >
      <div className="px-4 pt-4 pb-2">
        <TabsList className="h-7 p-0.5">
          <TabsTrigger value="github" className="gap-1.5 px-2.5 py-1 text-xs">
            <GitHubIcon className="size-3.5" />
            GitHub
          </TabsTrigger>
          <TabsTrigger value="leetcode" className="gap-1.5 px-2.5 py-1 text-xs">
            <LeetCodeIcon className="size-3.5" />
            LeetCode
          </TabsTrigger>
          <TabsIndicator />
        </TabsList>
      </div>

      <TabsContent value="github" keepMounted>
        <Suspense fallback={<GitHubContributionFallback />}>
          <GitHubContributionGraph contributions={githubContributions} />
        </Suspense>
      </TabsContent>

      <TabsContent value="leetcode" keepMounted>
        <Suspense fallback={<LeetCodeContributionFallback />}>
          <LeetCodeContributionGraph contributions={leetcodeContributions} />
        </Suspense>
      </TabsContent>
    </Tabs>
  )
}
