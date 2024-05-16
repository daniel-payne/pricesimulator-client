import type { HTMLAttributes, PropsWithChildren } from "react"

import MarketCurrentPriceCard from "../card/xMarketCurrentPriceCard"

import useStatus from "@/data/indexDB/hooks/useStatus"
import useMarkets from "@/data/indexDB/hooks/useMarkets"

import db from "@/data/indexDB/db"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusCurrentPricesListing({ name = "StatusCurrentPricesListing", ...rest }: PropsWithChildren<ComponentProps>) {
  //const symbols = useSymbols()
  const markets = useMarkets()
  const status = useStatus()

  const trends = db?.trendsCache

  const { currentPriceForSymbol = {} } = status ?? {}

  const entries = Object.entries(currentPriceForSymbol).filter((entry) => entry[1] != null)

  const symbols = entries?.map((entry) => entry[0]).sort()

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row flex-wrap gap-4 p-2">
        {symbols?.map((symbol) => {
          return <MarketCurrentPriceCard status={status} markets={markets} trends={trends} symbol={symbol} />
        })}
      </div>
    </div>
  )
}
