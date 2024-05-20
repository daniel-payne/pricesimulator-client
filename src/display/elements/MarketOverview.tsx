// import type { Market } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"
// import DefaultComponent from "../components/DefaultComponent"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import { Link } from "react-router-dom"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({ symbol, name = "MarketCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const currentPrice = useCurrentPriceForSymbol(symbol)

  if (market == null) {
    return null
  }

  return (
    <div {...rest} data-component={name}>
      <div className="w-full h-full bg--card rounded-xl shadow-xl p-4">
        <div className="h-full w-full overflow-hidden flex flex-col">
          <div>
            <div className="text-xl font-bold truncate">
              <span className="fg--heading">{market.name}</span>
              <span className="fg--subheading ps-2 text-sm">{market.description}</span>
            </div>
          </div>
          <div className="flex-auto border border--illustration my-2 overflow-hidden">{currentPrice?.midDayPrice}</div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-2">
              <div>indicator</div>
              <div>price</div>
            </div>
            <div className="flex flex-row justify-between items-center gap-2">
              <Link to={`/data/${market.symbol}`}>
                <button>Option</button>
              </Link>
              <button>Buy</button>
              <button>Sell</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
