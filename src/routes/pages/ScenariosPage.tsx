import ScenariosListing from "@/display/elements/ScenariosListing"

import synchronizeAllScenarios from "@/data/indexDB/controllers/synchronize/synchronizeAllScenarios"

import type { HTMLAttributes, PropsWithChildren } from "react"

export async function loader() {
  synchronizeAllScenarios()

  return null
}

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenariosPage({ name = "ScenariosPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-column justify-center items-center">
        <ScenariosListing />
      </div>
    </div>
  )
}
