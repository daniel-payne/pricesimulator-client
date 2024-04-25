import db from "@/data/indexDB/db"

import { useLiveQuery } from "dexie-react-hooks"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosTest({ name = "ScenariosTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const scenarios = useLiveQuery(async () => {
    return await db.scenarios?.toArray()
  })

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <h1 className="text-lg">{name}</h1>

      <div className="flex flex-row flex-wrap gap-2">
        {scenarios?.map((scenario: any) => {
          return (
            <div key={scenario.id} className="p-2 border-2 rounded">
              {scenario.name}
            </div>
          )
        })}
      </div>

      <div className="flex flex-row gap-2 py-2">
        <button className="btn btn-sm" onClick={() => db.synchronizeAllScenarios()}>
          Synchronize
        </button>
      </div>
    </div>
  )
}
