import synchronizeAllScenarios from "@/data/indexDB/controllers/synchronize/synchronizeAllScenarios"

import type { HTMLAttributes, PropsWithChildren } from "react"
import useScenarios from "@/data/indexDB/hooks/useScenarios"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosTest({ name = "ScenariosTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const scenarios = useScenarios()

  return (
    <div {...rest} data-controller={name}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Scenarios</h1>
        <div className="flex flex-row gap-2 p-2 bg-base-100">
          <button className="btn btn-sm" onClick={() => synchronizeAllScenarios()}>
            Synchronize All Scenarios
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {scenarios?.map((scenario: any) => {
            return (
              <div key={scenario.id} className="w-64 p-2 border-2 bg-base-200 rounded-lg">
                <div className="font-bold"> {scenario.id}</div>
                <div>{scenario.name}</div>
                <div className="text-xs">{scenario.description}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
