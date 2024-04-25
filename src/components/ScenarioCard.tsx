import { Scenario } from "@/data/indexDB/types/Scenario"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  scenario: Scenario

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenarioCard({ scenario, name = "ScenarioCard", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="card w-96 h-64 bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{scenario.name}</h2>
          <p>{scenario.description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-sm btn-primary" disabled={false}>
              Run Scenario
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
