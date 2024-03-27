import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HomePage({ name = "HomePage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name} style={{ border: "1px solid grey", padding: 2 }}>
      {name}
      <hr />
      <Link to="/markets">Markets</Link>
    </div>
  )
}
