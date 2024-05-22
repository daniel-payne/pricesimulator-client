// import type { Market } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"
// import DefaultComponent from "../components/DefaultComponent"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

import { FaExpand, FaHeart } from "react-icons/fa6"

import { Link } from "react-router-dom"

type ComponentProps = {
  symbol: string
  showGraphs?: boolean
  showActions?: boolean

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({ symbol, showGraphs = true, showActions = true, name = "MarketCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const currentPrice = useCurrentPriceForSymbol(symbol)

  if (market == null) {
    return null
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
              <Link to={`/status/market/${market.symbol}`} target="_blank">
                <FaExpand className="fg--subheading my-1" />
              </Link>
            </div>
          </div>
          {showGraphs && <div className="flex-auto border border--illustration my-2 overflow-hidden">{currentPrice?.midDayPrice}</div>}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-2">
              <div>indicator</div>
              <div>price</div>
            </div>
            {showActions && (
              <div className="flex flex-row justify-between items-center gap-2">
                <Link to={`/test/data/${market.symbol}`} target="_blank">
                  <button>Option</button>
                </Link>
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
