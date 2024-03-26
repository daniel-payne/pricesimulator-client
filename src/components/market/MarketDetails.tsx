"use client"

import useMarkets from "@/data/indexDB/hooks/useMarkets"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import type { HTMLAttributes, PropsWithChildren } from "react"
import useTrendForSymbol from "@/data/indexDB/hooks/useTrendForSymbol"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketDetails({ symbol, title = "MarketDetails", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const trend = useTrendForSymbol(symbol)

  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full border-1 rounded p-2">
        <pre>
          {market?.name} {trend?.opens.length}
        </pre>
      </div>
    </div>
  )
}
