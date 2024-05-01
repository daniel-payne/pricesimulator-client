import type { HTMLAttributes, PropsWithChildren } from "react"

import useStatus from "@/data/indexDB/hooks/useStatus"

import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusSummaryCard({ name = "StatusSummaryCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  return (
    <div {...rest} data-controller={name}>
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-end">
            <span>{formatTimestampDay(status?.currentDay)}</span>
            <span className="text-sm">{formatTimestamp(status?.currentDay)}</span>
          </h2>
          <p>ID : {status?.id}</p>
          <p>Timer : {status?.isTimerActive === true ? "Active" : "Inactive"}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-accent" disabled={status?.isTimerActive === true}>
              Fast
            </button>
            <button className="btn btn-sm btn-accent" disabled={status?.isTimerActive === true}>
              Medium
            </button>
            <button className="btn btn-sm btn-accent" disabled={status?.isTimerActive === true}>
              Slow
            </button>
            <button className="btn btn-sm btn-accent" disabled={status?.isTimerActive === false}>
              Stop Timer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
