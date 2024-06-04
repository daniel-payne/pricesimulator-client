import type { HTMLAttributes, PropsWithChildren } from "react"
import DefaultElement from "../DefaultElement"
import useStatus from "@/data/indexDB/hooks/useStatus"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatTimestamp from "@/utilities/formatTimestamp"

import { FaGear } from "react-icons/fa6"

import ApplicationNavigation from "@/display/components/ApplicationNavigation"
import { useQueryState } from "@keldan-systems/state-mutex"

type ComponentProps = {
  focus?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusHeader({ focus, name = "StatusHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const setView = useQueryState("view")[1]

  const { currentDay } = status ?? {}

  const handle1 = () => {
    setView("compact")
  }

  const handle2 = () => {
    setView("full")
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <ApplicationNavigation focus={focus} />
        {focus === "overview" && <DefaultElement name="DetailViewChooser" onClick={handle1} />}
        <DefaultElement name="HistoryRangeChooser" onClick={handle2} />
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
