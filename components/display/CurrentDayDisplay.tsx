import useStatus from "@/data/indexDB/hooks/useStatus"
import extractDateFromDay from "@/utilities/extractDateFromDay"
import extractNameFromDay from "@/utilities/extractNameFromDay"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function CurrentDayDisplay({ title = "CurrentDayDisplay", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const { currentDay } = status

  const dayOfWeek = extractNameFromDay(currentDay)
  const formattedDate = extractDateFromDay(currentDay)

  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full flex flex-row items-center justify-end gap-2 ps-1">
        <div className="text-lg  ">{dayOfWeek}</div>
        <div className="text-sm  ">{formattedDate}</div>
      </div>
    </div>
  )
}
