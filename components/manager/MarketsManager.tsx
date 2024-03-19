"use client"

import useMarkets from "@/data/indexDB/hooks/useMarkets"

import { Suspense, type HTMLAttributes, type PropsWithChildren } from "react"
import MarketOverview from "../market/MarketOverview"
import LayoutManager from "../utility/LayoutManager"

type ComponentProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsManager({ title = "MarketsManager", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useMarkets()

  return (
    <div {...rest} data-component={title}>
      <LayoutManager className="h-full w-full">
        {markets?.map((market) => (
          <div key={market.symbol}>
            <Suspense fallback={<div>Loading {market.symbol} ...</div>}>
              <MarketOverview key={market.symbol} symbol={market.symbol} />
            </Suspense>
          </div>
        ))}
      </LayoutManager>
    </div>
  )
}
