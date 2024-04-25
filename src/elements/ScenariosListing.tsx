import ScenarioCard from "@/components/ScenarioCard"
import db from "@/data/indexDB/db"
import { useLiveQuery } from "dexie-react-hooks"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosListing({ name = "ScenariosListing", ...rest }: PropsWithChildren<ComponentProps>) {
  const scenarios = useLiveQuery(async () => {
    return await db.scenarios?.toArray()
  })

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-col lg:flex-row flex-wrap gap-4 justify-center">
        {scenarios?.map((scenario: any) => {
          return <ScenarioCard key={scenario.id} scenario={scenario} />
        })}
      </div>
    </div>
  )
}
