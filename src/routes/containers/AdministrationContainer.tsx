import { Outlet } from "react-router-dom"

import AdminHeader from "@/display/elements/header/AdminHeader"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusContainer({ name = "StatusContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <AdminHeader />
        <div className="flex-auto overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
