import useTimer, { ScenarioSpeed } from "@/data/localStorage/hooks/useTimer"
import extractDateFromDay from "@/utilities/extractDateFromDay"
import extractNameFromDay from "@/utilities/extractNameFromDay"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CurrentDayDisplay({ name = "CurrentDayDisplay", ...rest }: PropsWithChildren<ComponentProps>) {
  const { data: status, actions } = useTimer()

  const { currentDay } = status ?? {}

  if (currentDay == null) {
    return null
  }

  const dayOfWeek = extractNameFromDay(currentDay)
  const formattedDate = extractDateFromDay(currentDay)

  const startTimerSlow = () => {
    actions.startTimer(ScenarioSpeed.slow)
  }

  const startTimerMedium = () => {
    actions.startTimer(ScenarioSpeed.medium)
  }

  const startTimerFast = () => {
    actions.startTimer(ScenarioSpeed.fast)
  }

  const stopTimer = () => {
    actions.stopTimer()
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-row items-center justify-end gap-2 ps-1">
        <div className="text-lg  ">{dayOfWeek}</div>
        <div className="text-sm  ">{formattedDate}</div>

        <button className="btn btn-sm btn-success" onClick={startTimerSlow}>
          Slow
        </button>
        <button className="btn btn-sm btn-success" onClick={startTimerMedium}>
          Medium
        </button>
        <button className="btn btn-sm btn-success" onClick={startTimerFast}>
          Fast
        </button>
        <button className="btn btn-sm btn-warning" onClick={stopTimer}>
          Stop
        </button>
      </div>
    </div>
  )
}
