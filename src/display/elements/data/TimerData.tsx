import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"
import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"
import useTimer from "@/data/indexDB/hooks/useTimer"
import formatTimestamp from "@/utilities/formatTimestamp"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TimerData({ name = "TimerData", ...rest }: PropsWithChildren<ComponentProps>) {
  const timer = useTimer()

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">Timer</h1>
      <div className="border border-primary rounded-lg m-2 p-2 flex flex-row gap-2 items-center justify-start">
        <button className="btn btn-sm btn-primary" onClick={() => timerNextDay(true)}>
          Next
        </button>
        <button className="btn btn-sm btn-success" onClick={() => timerStart(ScenarioSpeed.slow)}>
          Slow
        </button>
        <button className="btn btn-sm btn-success" onClick={() => timerStart(ScenarioSpeed.medium)}>
          Medium
        </button>
        <button className="btn btn-sm btn-success" onClick={() => timerStart(ScenarioSpeed.fast)}>
          Fast
        </button>
        <button className="btn btn-sm btn-warning" onClick={() => timerStop()}>
          Stop
        </button>
        <button className="btn btn-sm btn-error" onClick={() => timerStop()}>
          Reset
        </button>
        <div>{formatTimestamp(timer?.currentDay)}</div>
        <div>{timer?.isTimerActive ? "ACTIVE" : ""}</div>
      </div>
      {/* <pre className="border border-primary rounded-lg  m-2 p-2">{JSON.stringify(timer, null, 2)}</pre> */}
    </div>
  )
}
