import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"

import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import type { HTMLAttributes, PropsWithChildren } from "react"
import useStatus from "@/data/indexDB/hooks/useStatus"
import timerReset from "@/data/indexDB/controllers/timer/timerReset"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusTest({ name = "StatusTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  return (
    <div {...rest} data-controller={name}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Status</h1>
        <div className="flex flex-row gap-2 p-2 bg-base-100">
          <button className="btn btn-sm" onClick={() => timerNextDay(true)}>
            Next Day
          </button>
          <button className="btn btn-sm" onClick={() => timerStart(ScenarioSpeed.slow)}>
            Start Slow
          </button>
          <button className="btn btn-sm" onClick={() => timerStart(ScenarioSpeed.medium)}>
            Start medium
          </button>
          <button className="btn btn-sm" onClick={() => timerStart(ScenarioSpeed.fast)}>
            Start Fast
          </button>
          <button className="btn btn-sm" onClick={() => timerStop()}>
            Stop Timer
          </button>
          <button className="btn btn-sm" onClick={() => timerReset("2000-01-03")}>
            Reset 2000-01-03
          </button>
        </div>
        <pre>{JSON.stringify(status, null, 2)}</pre>
      </div>
    </div>
  )
}
