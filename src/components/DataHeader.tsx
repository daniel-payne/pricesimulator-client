import CurrentDayDisplay from "@/controls/timer/CurrentDayDisplay"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataHeader({ name = "DataHeader", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-between items-center p-2">
        <div>
          <Link to="/">
            <img src="/pricesimulator-32.png" alt="Home Page" style={{ height: 32, width: 32 }} />
          </Link>
        </div>
        <div className="flex-auto">{children}</div>
        <div>
          <CurrentDayDisplay />
        </div>
      </div>
    </div>
  )
}
