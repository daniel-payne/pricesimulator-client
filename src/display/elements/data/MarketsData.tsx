import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useDataForSymbol from "@/data/indexDB/hooks/useDataForSymbol"

import useMarkets from "@/data/indexDB/hooks/useMarkets"

import type { Market } from "@/data/indexDB/types/Market"
import formatNumber from "@/utilities/formatNumber"
import formatTimestamp from "@/utilities/formatTimestamp"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

const PriceData = ({ symbol }: { symbol: string }) => {
  const price = useCurrentPriceForSymbol(symbol)

  const currentPrice = price?.marketClosed ? price.lastClose : price?.midDayPrice

  const classNamesCurrentPrice = currentPrice == null ? "font-light" : "font-bold"
  const displayCurrentPrice = currentPrice == null ? "No Current Price" : formatNumber(currentPrice, 6)

  return (
    <div className="">
      <div>
        <span className={classNamesCurrentPrice}>{displayCurrentPrice}</span>
      </div>
      {/* <div>{formatTimestamp(price?.timestamp)}</div>
      <pre>{JSON.stringify(price, null, 2)}</pre> */}
    </div>
  )
}

const DataData = ({ symbol }: { symbol: string }) => {
  const data = useDataForSymbol(symbol)

  const count = data?.count ?? 0
  const firstActiveTimestamp = data?.firstActiveTimestamp

  const displayFirstActiveTimestamp = formatTimestamp(firstActiveTimestamp)

  const classNamesCurrentPrice = count > 0 ? "font-bold" : "font-light"

  return (
    <div className="">
      <span className={classNamesCurrentPrice}>{displayFirstActiveTimestamp}</span>
      &nbsp;
      <span className="text-xs">({count})</span>
    </div>
  )
}

const MarketData = ({ market }: { market: Market }) => {
  return (
    <div className="p-2 border border-primary rounded-lg  w-64" key={market.code}>
      <div className="truncated">
        <span className="text-primary">{market.name}</span>
        <span className="text-secondary ps-2 text-xs">{market.symbol}</span>
      </div>
      {/* <div className="text-secondary">{market.description} &nbsp;</div> */}

      <DataData symbol={market.symbol} />
      <PriceData symbol={market.symbol} />
    </div>
  )
}

export default function MarketsData({ name = "MarketsData", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useMarkets()

  if ((markets?.length ?? 0) < 1) {
    return <div>Loading Markets</div>
  }

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">{name}</h1>

      {/* <pre className="border border-primary m-2 p-2">{JSON.stringify(scenarios, null, 2)}</pre> */}

      <div className="flex-auto flex flex-row flex-wrap gap-2 justify-start items-center p-2 ">
        {markets?.map((market) => (
          <MarketData market={market} key={market.symbol} />
        ))}
      </div>
    </div>
  )
}
