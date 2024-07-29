import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketForm({ name = "MarketForm", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name} style={{ border: "1px solid #89CFF0", padding: 2 }}>
      <h1>{name}</h1>

      {children}
    </div>
  )
}
