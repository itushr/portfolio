"use client"

import { use } from "react"
import { formatNumber } from "@/utils/format"
import { format, parseISO } from "date-fns"
import { LoaderIcon } from "lucide-react"

import { LEETCODE_PROFILE_URL } from "@/config/site"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { Activity } from "@/registry/components/contribution-graph"
import {
  ContributionGraph,
  ContributionGraphBlock,
  ContributionGraphCalendar,
  ContributionGraphFooter,
  ContributionGraphLegend,
  ContributionGraphTotalCount,
} from "@/registry/components/contribution-graph"

export function LeetCodeContributionGraph({
  contributions,
  profileUrl = LEETCODE_PROFILE_URL,
}: {
  contributions: Promise<Activity[]>
  profileUrl?: string
}) {
  const data = use(contributions)

  if (data.length === 0) {
    return (
      <div className="flex h-45 w-full items-center justify-center text-sm text-muted-foreground">
        No LeetCode activity found.
      </div>
    )
  }

  return (
    <figure>
      <ContributionGraph
        className="mx-auto gap-4 py-4"
        data={data}
        blockSize={12}
        blockMargin={2}
        blockRadius={0}
        aria-label="LeetCode Contributions Graph"
      >
        <ContributionGraphCalendar
          className="px-4 **:data-[slot=month-labels]:text-muted-foreground"
          title="LeetCode Contributions"
          aria-hidden
        >
          {({ activity, dayIndex, weekIndex }) => (
            <Tooltip>
              <TooltipTrigger
                render={
                  <g>
                    <ContributionGraphBlock
                      activity={activity}
                      dayIndex={dayIndex}
                      weekIndex={weekIndex}
                    />
                  </g>
                }
              />
              <TooltipContent className="font-sans">
                <p>
                  {activity.count} submission{activity.count > 1 ? "s" : null}{" "}
                  on {format(parseISO(activity.date), "d MMM yyyy")}
                </p>
              </TooltipContent>
            </Tooltip>
          )}
        </ContributionGraphCalendar>

        <ContributionGraphFooter className="px-4 text-sm">
          <ContributionGraphTotalCount>
            {({ totalCount }) => (
              <figcaption className="text-pretty tabular-nums">
                <span className="mr-2 tracking-wide text-muted-foreground/80">
                  Fig. 2.
                </span>
                {formatNumber(totalCount)} submissions,{" "}
                {format(parseISO(data[0].date), "d MMM yyyy")} –{" "}
                {format(parseISO(data[data.length - 1].date), "d MMM yyyy")}.
                Source:{" "}
                <a
                  href={profileUrl}
                  className="link-underline"
                  target="_blank"
                  rel="noopener"
                >
                  LeetCode
                </a>
                .
              </figcaption>
            )}
          </ContributionGraphTotalCount>

          <ContributionGraphLegend aria-hidden />
        </ContributionGraphFooter>
      </ContributionGraph>
    </figure>
  )
}

export function LeetCodeContributionFallback() {
  return (
    <div className="flex h-45 w-full items-center justify-center">
      <LoaderIcon className="animate-spin text-muted-foreground" />
    </div>
  )
}
