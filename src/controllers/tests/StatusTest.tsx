import startTimer from "@/data/indexDB/controllers/timer/startTimer"
import stopTimer from "@/data/indexDB/controllers/timer/stopTimer"
import db from "@/data/indexDB/db"
import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"
import { useLiveQuery } from "dexie-react-hooks"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusTest({ name = "StatusTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useLiveQuery(async () => {
    return await db.status?.limit(1).first()
  })

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <h1 className="text-lg">{name}</h1>

      <div>Current ID : {db.id}</div>

      <pre>{JSON.stringify(status, null, 2)}</pre>

      <div className="flex flex-row gap-2 py-2">
        <button className="btn btn-sm" onClick={() => startTimer(ScenarioSpeed.slow)}>
          Start Slow
        </button>
        <button className="btn btn-sm" onClick={() => startTimer(ScenarioSpeed.medium)}>
          Start medium
        </button>
        <button className="btn btn-sm" onClick={() => startTimer(ScenarioSpeed.fast)}>
          Start Fast
        </button>
        <button className="btn btn-sm" onClick={() => stopTimer()}>
          Stop Timer
        </button>
      </div>
    </div>
  )
}
