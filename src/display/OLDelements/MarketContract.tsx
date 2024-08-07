import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

import TradeChart from "../OLDcomponents/TradeChart"

import useDataForSymbol from "@/data/indexDB/hooks/useDataForSymbol"

import YesterdayMovementDisplay from "../components/displays/YesterdayMovementDisplay"
import CurrentOpenDisplay from "../components/displays/CurrentOpenDisplay"

import { type HTMLAttributes, type PropsWithChildren } from "react"
import { useDataState } from "@keldan-systems/state-mutex"
import type { Range } from "../components/choosers/RangeChooser"
import ContractManager from "./ContractManager"
import ContractStrip from "./ContractStrip"
import useTimer from "@/data/indexDB/hooks/useTimer"
import useActiveTradeForSymbol from "@/data/indexDB/hooks/useActiveTradeForSymbol"
import useMargin from "@/data/indexDB/hooks/useMargin"

type ComponentProps = {
  symbol?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketContract({ symbol, name = "MarketContract", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)
  const data = useDataForSymbol(symbol)
  const trade = useActiveTradeForSymbol(symbol)

  const margin = useMargin(trade?.id)

  const range = useDataState<Range>("range")
  const compact = useDataState<string>("compact")
  const multiples = useDataState<string>("multiples")

  const timer = useTimer()

  const lastTrade = useDataState("LAST-TRADE-FOR-" + symbol)

  const showCompact = compact?.toUpperCase() === "TRUE" || compact?.toUpperCase() === "YES"
  const showMultiples = multiples?.toUpperCase() === "TRUE" || multiples?.toUpperCase() === "YES"

  const timestamp = timer?.currentTimestamp

  if (market == null || timestamp == null || timer == null) {
    return
  }

  return (
    <div {...rest} data-component={name}>
      <div className="w-full h-full bg--card rounded-xl shadow-xl p-4">
        <div className="h-full w-full overflow-hidden flex flex-col">
          <div className="flex flex-row justify-between gap-2">
            <div className="text-xl font-bold truncate">
              <span className="fg--heading">{market.name}</span>
              <span className="fg--subheading ps-2 text-sm">{market.description}</span>
            </div>
          </div>

          <div className="flex-auto  my-2 overflow-hidden flex flex-row gap-2">
            <TradeChart className="flex-auto h-full w-full" data={data} price={price} timestamp={timestamp} trade={trade} range={range} />
            {!showCompact && (
              <div className="h-full w-1/3 border border-primary rounded-lg p-2">
                {/* <pre>{JSON.stringify(price, null, 2)}</pre> */}
                <ContractManager
                  className="h-full w-full overflow-y-auto"
                  market={market}
                  price={price}
                  trade={trade}
                  lastTrade={lastTrade}
                  margin={margin}
                  timer={timer}
                  settings={{ showMultiples }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-2">
              <YesterdayMovementDisplay price={price} />
              <CurrentOpenDisplay price={price} />
            </div>
            {showCompact && <ContractStrip symbol={symbol} showMultiples={showMultiples} />}
          </div>
        </div>
      </div>
    </div>
  )
}
