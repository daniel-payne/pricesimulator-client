import { Link } from "@nextui-org/react"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function LatestPriceIndicator({ symbol, title = "LatestPriceIndicator", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title} style={{ border: "1px solid grey", padding: 2 }}>
      <Link href={`/markets/${symbol}`}>
        <h1>{symbol}</h1>
      </Link>
    </div>
  )
}
