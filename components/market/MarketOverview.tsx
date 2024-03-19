"use client"

import useMarkets from "@/data/indexDB/hooks/useMarkets"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import { Suspense, type HTMLAttributes, type PropsWithChildren } from "react"
import { Link, Skeleton } from "@nextui-org/react"
import useTrendForSymbol from "@/data/indexDB/hooks/useTrendForSymbol"
import LatestPriceIndicator from "../LatestPriceIndicator"
import MarketDescription from "../MarketDescription"
import QuickQuoteGenerator from "../QuickQuoteGenerator"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({ symbol, title = "MarketDetails", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full border-1 rounded p-2 flex flex-row flex-wrap gap-2">
        <Suspense fallback={<Skeleton className="h-3 w-3/5 rounded-lg" />}>
          <MarketDescription symbol={symbol} />
        </Suspense>
        <Suspense fallback={<div>Loading {symbol} ...</div>}>
          <LatestPriceIndicator symbol={symbol} />
        </Suspense>
        <Suspense fallback={<div>Loading {symbol} ...</div>}>
          <QuickQuoteGenerator symbol={symbol} />
        </Suspense>
      </div>
    </div>
  )
}
