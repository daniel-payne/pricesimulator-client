import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useDatumForSymbol from "@/data/indexDB/hooks/useDatumForSymbol"
import useMarkets from "@/data/indexDB/hooks/useMarkets"
import useStatusForSymbol from "@/data/indexDB/hooks/useStatusForSymbol"

import type { Market } from "@/data/indexDB/types/Market"
import formatTimestamp from "@/utilities/formatTimestamp"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

const DatumData = ({ symbol }: { symbol: string }) => {
  const datum = useDatumForSymbol(symbol)

  return <div className="">{datum?.opens?.values?.length} Prices</div>
}

const StatusData = ({ symbol }: { symbol: string }) => {
  const status = useStatusForSymbol(symbol)

  return (
    <div className="">
      <div>
        {status?.state}, data From: {formatTimestamp(status?.firstActiveTimestamp)}{" "}
      </div>
      <DatumData symbol={symbol} />
    </div>
  )
}

const CurrentData = ({ symbol }: { symbol: string }) => {
  const price = useCurrentPriceForSymbol(symbol)

  return (
    <div className="">
      {/* {JSON.stringify(price, null, 2)} */}
      {price?.marketClosed ? price.lastClose : price?.midDayPrice}
    </div>
  )
}

const MarketData = ({ market }: { market: Market }) => {
  return (
    <div className="p-2 border border-primary rounded-lg  w-96" key={market.code}>
      <div className="text-primary">
        {market.name} {market.symbol}
      </div>
      <div className="text-secondary">{market.description} &nbsp;</div>
      <StatusData symbol={market.symbol} />
      <CurrentData symbol={market.symbol} />
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
