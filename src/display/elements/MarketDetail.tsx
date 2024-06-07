import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6"

import { Link } from "react-router-dom"
import HistoryChart from "../components/HistoryChart"

import useDatumForSymbol from "@/data/indexDB/hooks/useDatumForSymbol"

import YesterdayMovementDisplay from "../components/YesterdayMovementDisplay"
import CurrentOpenDisplay from "../components/CurrentOpenDisplay"

import type { HTMLAttributes, PropsWithChildren } from "react"
import { useDataState } from "@keldan-systems/state-mutex"
import type { Range } from "../components/HistoryRangeChooser"
import QuoteManager from "./QuoteManager"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketDetail({ symbol, name = "MarketDetail", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)
  const datum = useDatumForSymbol(symbol)

  const range = useDataState<Range>("range")

  if (market == null) {
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
            <div className="flex flex-row justify-between gap-2">
              <FaHeart className="fg--subheading my-1" />
            </div>
          </div>

          <div className="flex-auto  my-2 overflow-hidden flex flex-row gap-2">
            <HistoryChart className="flex-auto h-full w-full" datum={datum} price={price} range={range} />
            <div className="h-full w-1/3 border border-primary rounded-lg p-2">
              <QuoteManager className="h-full w-full" symbol={symbol} />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-between items-center gap-2">
              <YesterdayMovementDisplay price={price} />
              <CurrentOpenDisplay price={price} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
