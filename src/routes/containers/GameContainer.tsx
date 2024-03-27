import CurrentDayDisplay from "@/controls/timer/CurrentDayDisplay"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link, Outlet } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function GameContainer({ name = "GameContainer", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-0 ">
        <div>
          <Link to="/">Home</Link>
          <CurrentDayDisplay />
        </div>
        <Outlet />
        <div>Footer</div>
      </div>
    </div>
  )
}
