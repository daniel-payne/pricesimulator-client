import { Link } from "react-router-dom"

import ScenarioCard from "@/display/components/ScenarioCard"

import synchronizeAllScenarios from "@/data/indexDB/controllers/synchronize/synchronizeAllScenarios"

import type { HTMLAttributes, PropsWithChildren } from "react"
import useScenarios from "@/data/indexDB/hooks/useScenarios"

export async function loader() {
  synchronizeAllScenarios()

  return null
}

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosPage({ name = "ScenariosPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const scenarios = useScenarios()

  return (
    <div {...rest} data-component={name}>
      <div className="p-6 h-full w-full flex flex-col gap-2 justify-start lg:justify-center ">
        {/* heading */}
        <div className="mt-6 h-32 flex flex-col gap-4 justify-center items-center">
          <Link to="/">
            <div className="text-6xl font-extrabold leading-none tracking-tight text-primary">Price Simulator</div>
          </Link>
          <div className="text-2xl font-extrabold leading-none tracking-tight text-gray-500">
            <span>Work through these scenarios to learn how trading in financial markets works.</span>
          </div>
        </div>
        {/* main */}
        <div className="flex-auto flex flex-row flex-wrap gap-2 justify-center items-center">
          {scenarios?.map((scenario) => (
            <ScenarioCard className="p-6" scenario={scenario} key={scenario.code} />
          ))}
        </div>

        {/* aside */}
        <div className="h-32 pb-6 lg:pb-0 flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 text-md font-extrabold leading-none tracking-tight text-gray-500 text-center">
            <div className="font-extrabold leading-none tracking-tight text-gray-500">
              <span className="text-sm">Currently in the game it is &nbsp;</span>
              <span className="text-lg">Tuesday &nbsp;</span>
              <span className="text-md">03 Jan 1970</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
