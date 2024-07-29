import { useState } from "react"

import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
import timerReset from "@/data/indexDB/controllers/timer/timerReset"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"

import useTimer from "@/data/indexDB/hooks/useTimer"

import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import type { HTMLAttributes, PropsWithChildren } from "react"
import CurrentDateDisplay from "@/display/components/displays/CurrentDateDisplay"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TimerTest({ name = "TimerTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const [showAsJSON, setShowAsJSON] = useState(false)

  const timer = useTimer()

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">
        {name} &nbsp;
        <button className="btn btn-xs btn-primary" onClick={() => setShowAsJSON(!showAsJSON)}>
          {showAsJSON ? "Hide JSON" : "Show as JSON"}
        </button>
      </h1>
      {showAsJSON === true && (
        <div>
          <pre>{JSON.stringify(timer, null, 2)}</pre>
        </div>
      )}
      {showAsJSON === false && (
        <div className="border border-primary rounded-lg m-2 p-2 flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-row gap-2 items-center justify-between">
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
            <button className="btn btn-sm btn-error" onClick={() => timerReset()}>
              Reset
            </button>
            <button className="btn btn-sm btn-error" onClick={() => timerReset("2020-10-01")}>
              Reset 10/01/2020
            </button>
            <div>{timer?.isTimerActive ? "ACTIVE" : ""}</div>
          </div>
          <div className="flex flex-row gap-2 items-center justify-between">
            <CurrentDateDisplay timer={timer} />
          </div>
        </div>
      )}
      {/* <pre className="border border-primary rounded-lg  m-2 p-2">{JSON.stringify(timer, null, 2)}</pre> */}
    </div>
  )
}
