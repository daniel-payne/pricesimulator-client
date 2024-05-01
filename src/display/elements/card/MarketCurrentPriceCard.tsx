import type { HTMLAttributes, PropsWithChildren } from "react"

// import useStatus from "@/data/indexDB/hooks/useStatus"
import { Price } from "@/data/indexDB/types/Price"
import { Status } from "@/data/indexDB/types/Status"
import { Market } from "@/data/indexDB/types/Market"
import HistoryChart from "@/display/components/HistoryChart"
import { Trend } from "@/data/indexDB/types/Trend"
// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

function formatPrice(value: number | null | undefined) {
  if (value == null) {
    return null
  }
  return value.toFixed(6)
}

type ComponentProps = {
  status: Status | undefined
  markets: Array<Market> | undefined
  trends: Record<string, Trend> | undefined
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

const RANGE = 30

export default function MarketCurrentPriceCard({
  status,
  markets,
  trends,
  symbol,
  name = "MarketCurrentPriceCard",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  // const market = useMarketForSymbol(symbol)
  // const price = useCurrentPriceForSymbol(symbol)
  // const status = useStatus()

  const market = markets?.find((market) => market.symbol === symbol)
  const price = status?.currentPriceForSymbol?.[symbol] ?? ({} as Price)

  const trend = trends != null ? trends[symbol] : ({} as Trend)

  const currentPosition = price.currentIndex ?? 0

  const start = currentPosition > RANGE ? currentPosition - RANGE : 0
  const end = currentPosition

  const timestamps = trend?.timestamps?.slice(start, end) ?? []
  const highs = trend?.highs?.slice(start, end) ?? []
  const lows = trend?.lows?.slice(start, end) ?? []
  const closes = trend?.closes?.slice(start, end) ?? []

  // const currentPriceForSymbol = status?.currentPriceForSymbol ?? {}

  // const entry = Object.entries(currentPriceForSymbol).find(([match]) => match === symbol)

  // if (entry != null && entry[1] != null) {
  //   price = entry[1]
  // }

  return (
    <div {...rest} data-component={name}>
      <div className="card w-64 h-64 bg-base-300 shadow-xl overflow-hidden">
        <div className="card-body">
          <h4 className="card-title truncate">{market?.name}</h4>
          <p className="truncate h-8">{market?.description}&nbsp;</p>

          <div className="h-full ">
            <div className="text-xs">
              <span>{formatPrice(price?.bid)}</span>
              <span className="ps-2">{formatPrice(price?.offer)}</span>
            </div>
            <HistoryChart timestamps={timestamps} highs={highs} lows={lows} closes={closes} price={price} />
          </div>

          {/* <DefaultComponent name="PriceSummary" className="">
            <div className="h-full flex flex-col">
              <DefaultComponent name="PriceSparkline" className="h-24" />
              <DefaultComponent name="PriceLatest" className="h-8" />
            </div>
          </DefaultComponent>
          */}
          {/* <div className="card-actions justify-end">
            <button className="btn btn-sm w-20 btn-outline  btn-primary">Buy</button>
            <button className="btn btn-sm w-20 btn-outline  btn-primary">Sell</button>
            <button className="btn btn-sm w-20 btn-outline  btn-secondary">Put</button>
            <button className="btn btn-sm w-20 btn-outline  btn-secondary">Call</button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
