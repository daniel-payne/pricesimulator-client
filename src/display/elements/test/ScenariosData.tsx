import useScenarios from "@/data/indexDB/hooks/useScenarios"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosData({ name = "ScenariosData", ...rest }: PropsWithChildren<ComponentProps>) {
  const scenarios = useScenarios()

  if ((scenarios?.length ?? 0) < 1) {
    return <div>Loading Scenarios</div>
  }

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">Scenarios</h1>

      <div className="flex-auto flex flex-row flex-wrap gap-2 justify-start items-center p-2 ">
        {scenarios?.map((scenario) => (
          <div className="p-2 border border-primary rounded-lg  w-96" key={scenario.code}>
            <div className="text-primary">
              {scenario.displayOrder} {scenario.name}
            </div>
            <div className="text-secondary">{scenario.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
