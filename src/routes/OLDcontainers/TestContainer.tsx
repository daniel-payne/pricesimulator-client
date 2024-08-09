import type { HTMLAttributes, PropsWithChildren } from "react"
import { Outlet } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TestContainer({ name = "TestContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <div className="bg-gray-200">Header</div>
        <div className="flex-auto overflow-auto">
          <Outlet />
        </div>
        <div className="bg-gray-200">Footer</div>
      </div>
    </div>
  )
}
