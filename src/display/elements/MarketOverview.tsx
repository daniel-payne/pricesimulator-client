import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

import { FaExpand, FaHeart } from "react-icons/fa6"

import { Link } from "react-router-dom"
import HistoryChart from "../components/HistoryChart"

import useTrendForSymbol from "@/data/indexDB/hooks/useTrendForSymbol"

import YesterdayMovementDisplay from "../components/YesterdayMovementDisplay"
import CurrentOpenDisplay from "../components/CurrentOpenDisplay"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string
  showGraphs?: boolean
  showActions?: boolean

  name?: string
} & HTMLAttributes<HTMLDivElement>

const RANGE = 30

export default function MarketOverview({ symbol, showGraphs = true, showActions = true, name = "MarketCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)
  const trend = useTrendForSymbol(symbol)

  const currentPosition = price?.currentIndex ?? 0

  const start = currentPosition > RANGE ? currentPosition - RANGE : 0
  const end = currentPosition

  const timestamps = trend?.timestamps?.slice(start, end) ?? []
  const highs = trend?.highs?.slice(start, end) ?? []
  const lows = trend?.lows?.slice(start, end) ?? []
  const closes = trend?.closes?.slice(start, end) ?? []

  if (market == null) {
    return (
      <div {...rest} data-component={name}>
        <div className="w-full h-full bg--card rounded-xl shadow-xl p-4">
          <div className="h-full w-full overflow-hidden flex flex-col">
            <div className="flex flex-row justify-between gap-2">
              <div className="text-xl font-bold truncate">
                <span className="fg--heading">{symbol}</span>
              </div>
            </div>
            <div className="fg--subheading  text-sm">
              <progress className="h-1 progress w-full"></progress>
              <div>Loading Data </div>
            </div>
          </div>
        </div>
      </div>
    )
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
            <div className="flex flex-row justify-between gap-2">
              <FaHeart className="fg--subheading my-1" />
              <Link to={`/markets/${market.symbol}/detail`}>
                <FaExpand className="fg--subheading my-1" />
              </Link>
            </div>
          </div>
          {showGraphs && (
            <div className="flex-auto  my-2 overflow-hidden">
              <HistoryChart timestamps={timestamps} highs={highs} lows={lows} closes={closes} price={price} />
              {/* <pre className="h-full w-full overflow-auto">{JSON.stringify(price, null, 2)}</pre> */}
            </div>
          )}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-2">
              <YesterdayMovementDisplay price={price} />
              <CurrentOpenDisplay price={price} />
            </div>
            {showActions && (
              <div className="flex flex-row justify-between items-center gap-2">
                {/* <Link to={`/test/data/${market.symbol}`} target="_blank">
                  <button>Option</button>
                </Link> */}
                <button>Buy</button>
                <button>Sell</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
