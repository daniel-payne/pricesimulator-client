import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"

import type { HTMLAttributes, PropsWithChildren } from "react"

import { Link } from "react-router-dom"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function LatestPriceIndicator({ symbol, title = "LatestPriceIndicator", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)

  return (
    <div {...rest} data-component={title}>
      <div className="w-full">
        <Link to={`/markets/${symbol}`}>
          <h1>{market?.name ?? symbol}</h1>
        </Link>
      </div>
    </div>
  )
}
