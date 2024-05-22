import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
import timerReset from "@/data/indexDB/controllers/timer/timerReset"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"
import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"
import useStatus from "@/data/indexDB/hooks/useStatus"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ request, params }: any) {
  const url = new URL(request.url)
  const search = url.searchParams.toString()

  return { params, search }
}

export default function ActionsPage({ name = "ActionsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const handleNextDay = () => timerNextDay(true)
  const handleStartSlow = () => timerStart(ScenarioSpeed.slow)
  const handleStartMedium = () => timerStart(ScenarioSpeed.medium)
  const handleStartFast = () => timerStart(ScenarioSpeed.fast)
  const handleStop = () => timerStop()
  const handleReset = () => timerReset()

  return (
    <div {...rest} data-component={name}>
      <div className="text-base-700 text-2xl font-bold p-2">Status Data</div>
      <div className="p-2">
        <pre>{JSON.stringify(status?.currentDay, null, 2)}</pre>
      </div>
      <div className="text-base-700 text-2xl font-bold p-2">Timer Actions</div>
      <div className="p-4 flex flex-row gap-2 border-2 m-2 rounded-lg border--illustration">
        <button className="btn btn-success" onClick={handleNextDay}>
          Next Day
        </button>
        <button className="btn btn-success" onClick={handleStartSlow}>
          Slow
        </button>
        <button className="btn btn-success" onClick={handleStartMedium}>
          Medium
        </button>
        <button className="btn btn-success" onClick={handleStartFast}>
          Fast
        </button>
        <button className="btn btn-warning" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-error" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="text-base-700 text-2xl font-bold p-2">Open Actions</div>
      <div className="p-4 flex flex-row gap-2 border-2 m-2 rounded-lg border--illustration">
        <button className="btn btn-success" disabled>
          S&P 500
        </button>
        <button className="btn btn-success" disabled>
          CAD/USD
        </button>
      </div>

      <div className="text-base-700 text-2xl font-bold p-2">Close Actions</div>
      <div className="p-4 flex flex-row gap-2 border-2 m-2 rounded-lg border--illustration">
        <button className="btn btn-warning" disabled>
          GBP/USD 1LIKBY-CCMPR9
        </button>
        <button className="btn btn-warning" disabled>
          Close BYIK1LIK-CR9CMP
        </button>
      </div>
    </div>
  )
}
