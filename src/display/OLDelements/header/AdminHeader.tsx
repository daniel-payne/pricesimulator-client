import type { HTMLAttributes, PropsWithChildren } from "react"
import DefaultElement from "../DefaultElement"
import useTimer from "@/data/indexDB/hooks/useTimer"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatTimestamp from "@/utilities/formatTimestamp"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusHeader({ name = "StatusHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const timer = useTimer()

  const { currentDay } = timer ?? {}

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <DefaultElement name="ApplicationNavigation" />
        <DefaultElement name="CloseAllTrades" />
        {/* <DefaultElement name="CurrentDayDisplay">{currentDay}</DefaultElement> */}
        <div className="flex flex-row gap-2 justify-right items-center bg-base-200 p-2">
          <div className="w-4 font-bold text-right">{formatTimestampDay(currentDay)}</div>
          <div className="w-24 ps-2 text-sm text-right">{formatTimestamp(currentDay)}</div>
        </div>
      </div>
    </div>
  )
}
