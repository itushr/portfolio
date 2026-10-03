import "server-only"

import { unstable_cache } from "next/cache"

import { LEETCODE_USERNAME } from "@/config/site"
import type { Activity } from "@/registry/components/contribution-graph"

export type LeetCodeDailyContribution = {
  date: string
  timestamp?: number
  count: number
  level: number
}

export type LeetCodeHeatmapResponse = {
  status: string
  message?: string
  username?: string
  startDate?: string
  endDate?: string
  firstActiveDate?: string
  lastActiveDate?: string
  totalSubmissions?: number
  activeDays?: number
  currentStreak?: number
  longestStreak?: number
  maxDailySubmissions?: number
  dailyContributions?: LeetCodeDailyContribution[]
  yearlyContributions?: Array<{
    year: number
    totalSubmissions: number
    activeDays: number
  }>
  availableYears?: number[]
}

/**
 * Transforms LeetCode daily contributions to the common Activity[] format.
 *
 * Differences managed between GitHub and LeetCode APIs:
 * 1. Property names: LeetCode uses `dailyContributions` while GitHub uses `contributions`.
 * 2. Item schema: LeetCode includes `timestamp`; normalized to `{ date, count, level }`.
 * 3. Timespan: GitHub returns the last year (~365 days / 52-53 weeks) via `?y=last`.
 *    LeetCode returns all days from `startDate` to `endDate` (over 1000 days).
 *    We slice the last `days` (default 365) to align the two graphs visually.
 * 4. Level safety: Clamps level values to [0, 4] to conform to ContributionGraph range.
 */
export function transformLeetCodeContributions(
  dailyContributions: LeetCodeDailyContribution[] = [],
  days = 365
): Activity[] {
  const items =
    days > 0 && dailyContributions.length > days
      ? dailyContributions.slice(-days)
      : dailyContributions

  return items.map(({ date, count, level }) => ({
    date,
    count: count ?? 0,
    level: Math.max(0, Math.min(4, Math.round(level ?? 0))),
  }))
}

export const getCachedLeetCodeContributions = unstable_cache(
  async (username: string): Promise<Activity[]> => {
    const baseUrl = process.env.NEXT_PUBLIC_LEETCODE_CONTRIBUTIONS_API_URL

    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_LEETCODE_CONTRIBUTIONS_API_URL is not set")
    }

    try {
      const res = await fetch(`${baseUrl}/${username}/heatmap`)
      if (!res.ok) {
        return []
      }

      const data = (await res.json()) as LeetCodeHeatmapResponse
      if (
        data.status !== "success" ||
        !Array.isArray(data.dailyContributions)
      ) {
        return []
      }

      return transformLeetCodeContributions(data.dailyContributions)
    } catch {
      return []
    }
  },
  ["leetcode-contributions"],
  { revalidate: 86400 } // Cache for 1 day (86400 seconds)
)

export function getLeetCodeContributions(username: string = LEETCODE_USERNAME) {
  return getCachedLeetCodeContributions(username)
}
