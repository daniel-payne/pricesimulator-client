import ScenariosListing from "@/controllers/ScenariosListing"
import db from "@/data/indexDB/db"
import type { HTMLAttributes, PropsWithChildren } from "react"

export async function loader() {
  db.synchronizeAllScenarios()

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
