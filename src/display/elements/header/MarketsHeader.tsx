import type { HTMLAttributes, PropsWithChildren } from "react"

import useStatus from "@/data/indexDB/hooks/useStatus"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatTimestamp from "@/utilities/formatTimestamp"

import { FaGear } from "react-icons/fa6"

import ApplicationNavigation from "@/display/components/ApplicationNavigation"

import HistoryRangeChooser from "@/display/components/HistoryRangeChooser"
import DetailViewChooser from "@/display/components/DetailViewChooser"

type ComponentProps = {
  focus?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsHeader({ focus, name = "MarketsHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const { currentDay } = status ?? {}

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
          <div className="w-4 font-bold text-right">{formatTimestampDay(currentDay)}</div>
          <div className="w-24 ps-2 text-sm text-right">{formatTimestamp(currentDay)}</div>
          <FaGear />
        </div>
      </div>
    </div>
  )
}
