import { Suspense } from "react"
import MarketOverview from "@/controls/market/MarketOverview"
import LayoutManager from "@/components/LayoutManager"
import useMarkets from "@/data/indexDB/hooks/useMarkets"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsPage({ name = "MarketsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useMarkets()

  return (
    <div {...rest} data-component={name}>
      {/* <pre>{JSON.stringify(markets, null, 2)}</pre> */}
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
