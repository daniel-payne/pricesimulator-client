"use client"

import { Suspense } from "react"

import Skeleton from "@/components/skeleton/Skeleton"

import LatestPriceIndicator from "@/components/price/LatestPriceIndicator"
// import MarketDescription from "../MarketDescription"

import { type HTMLAttributes, type PropsWithChildren } from "react"
import MarketDescription from "@/components/market/MarketDescription"

type ComponentProps = {
  symbol: string | undefined

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({ symbol, title = "MarketDetails", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title}>
      <div className="h-full w-full border-1 rounded p-2 flex flex-col  gap-2">
        <Suspense fallback={<Skeleton />}>
          <MarketDescription symbol={symbol} />
        </Suspense>
        <Suspense fallback={<Skeleton />}>
          <LatestPriceIndicator symbol={symbol} />
        </Suspense>
        {/* <Suspense fallback={<div>Loading {symbol} ...</div>}>
          <QuickQuoteGenerator symbol={symbol} />
        </Suspense> */}
      </div>
    </div>
  )
}
