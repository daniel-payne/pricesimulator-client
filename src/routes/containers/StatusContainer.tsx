import { Outlet, useParams } from "react-router-dom"

import StatusHeader from "@/display/elements/header/StatusHeader"
import StatusFooter from "@/display/elements/footer/StatusFooter"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusContainer({ name = "StatusContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  const { focus } = useParams()

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <StatusHeader focus={focus} />
        <div className="flex-auto overflow-auto">
          <Outlet />
        </div>
        <StatusFooter />
      </div>
    </div>
  )
}
