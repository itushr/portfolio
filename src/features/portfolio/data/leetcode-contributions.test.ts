import { describe, expect, it, vi } from "vitest"

import {
  transformLeetCodeContributions,
  type LeetCodeDailyContribution,
} from "./leetcode-contributions"

vi.mock("server-only", () => ({}))

describe("transformLeetCodeContributions", () => {
  it("transforms dailyContributions to Activity[] format without extra properties", () => {
    const mockContributions: LeetCodeDailyContribution[] = [
      {
        date: "2026-09-01",
        timestamp: 1788220800,
        count: 5,
        level: 2,
      },
    ]

    const result = transformLeetCodeContributions(mockContributions)

    expect(result).toEqual([
      {
        date: "2026-09-01",
        count: 5,
        level: 2,
      },
    ])
    expect(result[0]).not.toHaveProperty("timestamp")
  })

  it("slices the last N days when list exceeds days limit", () => {
    const mockContributions: LeetCodeDailyContribution[] = Array.from(
      { length: 400 },
      (_, i) => ({
        date: `2025-${String(i + 1).padStart(3, "0")}`,
        timestamp: 1700000000 + i * 86400,
        count: i,
        level: i % 5,
      })
    )

    const result = transformLeetCodeContributions(mockContributions, 365)

    expect(result).toHaveLength(365)
    expect(result[result.length - 1].count).toBe(399)
  })

  it("retains all contributions if total days is less than days limit", () => {
    const mockContributions: LeetCodeDailyContribution[] = [
      { date: "2026-09-01", count: 2, level: 1 },
      { date: "2026-09-02", count: 4, level: 2 },
    ]

    const result = transformLeetCodeContributions(mockContributions, 365)

    expect(result).toHaveLength(2)
  })

  it("clamps levels strictly to the 0-4 range", () => {
    const mockContributions: LeetCodeDailyContribution[] = [
      { date: "2026-09-01", count: 0, level: -1 },
      { date: "2026-09-02", count: 10, level: 7 },
      { date: "2026-09-03", count: 3, level: 2 },
    ]

    const result = transformLeetCodeContributions(mockContributions)

    expect(result[0].level).toBe(0)
    expect(result[1].level).toBe(4)
    expect(result[2].level).toBe(2)
  })

  it("handles undefined or empty input gracefully", () => {
    expect(transformLeetCodeContributions([])).toEqual([])
    expect(transformLeetCodeContributions(undefined)).toEqual([])
  })
})
