"use client"

import { Suspense } from "react"

import TextSkeleton from "@/components/TextSkeleton"

import LivePriceIndicator from "@/controls/price/LivePriceIndicator"
// import MarketDescription from "../MarketDescription"

import { type HTMLAttributes, type PropsWithChildren } from "react"
import MarketDescription from "@/controls/market/MarketDescription"

type ComponentProps = {
  symbol: string | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({ symbol, name = "MarketDetails", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full border-1 rounded p-2 flex flex-col  gap-2">
        <Suspense fallback={<TextSkeleton />}>
          <MarketDescription symbol={symbol} />
        </Suspense>
        <Suspense fallback={<TextSkeleton />}>
          <LivePriceIndicator symbol={symbol} />
        </Suspense>
        {/* <Suspense fallback={<div>Loading {symbol} ...</div>}>
          <QuickQuoteGenerator symbol={symbol} />
        </Suspense> */}
      </div>
    </div>
  )
}
