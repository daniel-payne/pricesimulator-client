import DataHeader from "@/components/DataHeader"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataContainer({ name = "DataContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <DataHeader />
        <div className="overflow-auto">
          <Outlet />
        </div>
        <div>Footer</div>
      </div>
    </div>
  )
}
