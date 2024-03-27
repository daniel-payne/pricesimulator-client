import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketQuote({ symbol, name = "MarketQuote", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name} style={{ border: "1px solid grey", padding: 2 }}>
      <h1>{symbol}</h1>
    </div>
  )
}
