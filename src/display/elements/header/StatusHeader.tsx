import type { HTMLAttributes, PropsWithChildren } from "react"
import DefaultElement from "../DefaultElement"
import useStatus from "@/data/indexDB/hooks/useStatus"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatTimestamp from "@/utilities/formatTimestamp"

import { FaGear } from "react-icons/fa6"
import { useSearchParams } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusHeader({ name = "StatusHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()
  const [searchParams, setSearchParams] = useSearchParams()

  const { currentDay } = status ?? {}

  const handle = () => {
    setSearchParams({ ...Object.fromEntries(searchParams), view: "compact" })
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <DefaultElement name="ApplicationNavigation" />
        <DefaultElement name="DetailViewChooser" onClick={handle} />
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
