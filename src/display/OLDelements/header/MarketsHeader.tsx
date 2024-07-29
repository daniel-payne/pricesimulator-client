import type { HTMLAttributes, PropsWithChildren } from "react"

import useTimer from "@/data/indexDB/hooks/useTimer"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatTimestamp from "@/utilities/formatTimestamp"

import { FaGear } from "react-icons/fa6"

import ApplicationNavigation from "@/display/OLDcomponents/ApplicationNavigation"

import HistoryRangeChooser from "@/display/components/choosers/RangeChooser"
import DetailViewChooser from "@/display/components/choosers/ViewChooser"
// import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
// import timerStop from "@/data/indexDB/controllers/timer/timerStop"
// import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import timerReset from "@/data/indexDB/controllers/timer/timerReset"

type ComponentProps = {
  focus?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsHeader({ focus, name = "MarketsHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const timer = useTimer()

  const { currentDay } = timer ?? {}

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <ApplicationNavigation focus={focus} />
        <div className="flex flex-row gap2 justify-center items-center">
          {focus === "overview" && (
            <>
              <DetailViewChooser />
              <div className="divider divider-horizontal" />
            </>
          )}
          <HistoryRangeChooser />
        </div>
        {/* <DefaultElement name="CurrentDayDisplay">{currentDay}</DefaultElement> */}
        <div className="flex flex-row gap-2 justify-right items-center bg-base-200 p-2">
          {/* <button className="btn btn-sm btn-error" onClick={() => timerReset()}>
            Reset
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => timerNextDay(true)}>
            Next
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => timerStop()}>
            Stop
          </button>
          <button className="btn btn-sm btn-primary" onClick={() => timerStart()}>
            Start
          </button> */}
          <div className="w-4 font-bold text-right">{formatTimestampDay(currentDay)}</div>
          <div className="w-24 ps-2 text-sm text-right">{formatTimestamp(currentDay)}</div>
          <FaGear />
        </div>
      </div>
    </div>
  )
}
