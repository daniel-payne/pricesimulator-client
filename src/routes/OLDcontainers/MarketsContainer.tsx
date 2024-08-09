import { Outlet, useParams } from "react-router-dom"

import MarketsHeader from "@/display/OLDelements/header/MarketsHeader"
import MarketsFooter from "@/display/OLDelements/footer/MarketsFooter"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsContainer({ name = "MarketsContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  const { focus } = useParams()

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <MarketsHeader focus={focus} />
        <div className="flex-auto overflow-auto">
          <Outlet />
        </div>
        <MarketsFooter />
      </div>
    </div>
  )
}
