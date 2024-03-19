import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function DefaultComponent({ symbol, title = "DefaultComponent", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title} style={{ border: "1px solid grey", padding: 2 }}>
      <h1>{symbol}</h1>
    </div>
  )
}
