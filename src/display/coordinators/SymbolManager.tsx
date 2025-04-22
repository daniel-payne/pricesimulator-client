import type { HTMLAttributes, PropsWithChildren } from "react"



import useMarketFor from "@/data/indexDB/hooks/useMarketFor"

import usePriceFor from "@/data/indexDB/hooks/usePriceFor"

import MarketHeader from "../components/MarketHeader"
import MarketFooter from "../components/MarketFooter"
import FormManager from "./FormManager"

import MarketPriceDescription from "../components/MarketPriceDescription"
import ContractDescription from "../components/ContractDescription"

import ClosesManager from "./ClosesManager"
import HighLowManager from "./HighLowManager"

import type { Settings } from "../Settings"


import useTimer from "@/data/indexDB/hooks/useTimer"
import MarketSummaryDescription from "../components/MarketSummaryDescription"

type ComponentProps = {
  symbol: string

  settings?: Settings
  favoriteSymbols?: Array<string>

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function SymbolManager({
  symbol,

  settings = {},
  favoriteSymbols = [],

  name = "SymbolManager",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const market = useMarketFor(symbol)
  const price = usePriceFor(symbol)

  const timer = useTimer()

  const { showExpanded = true, content = "price" } = settings

  if (market == null || price == null) {
    return null
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full rounded-xl p-4 bg-base-300 shadow-xl ">
        <div className="h-full w-full flex flex-col gap-2 ">
          <MarketHeader market={market} settings={settings} favoriteSymbols={favoriteSymbols} />
          <div className="flex-auto overflow-auto">
            {showExpanded && (
              <div className="h-full w-full relative">
                {content === "info" && (
                  <>
                    <MarketSummaryDescription market={market} />
                    <ContractDescription market={market} price={price} timer={timer} settings={settings} />
                  </>
                )}
                {content === "price" && <MarketPriceDescription market={market} price={price} />}
                {content === "sparkline" && <ClosesManager className="h-full w-full" symbol={symbol} settings={settings} showPriceScale={false} />}
                {content === "chart" && <HighLowManager className="h-full w-full" symbol={symbol} settings={settings} />}
                {content === "form" && <FormManager className="h-full w-full " symbol={symbol} settings={settings} />}
                {content === "both" && (
                  <div className="h-full w-full flex flex-row gap-2">
                    <div className="flex-auto">
                      <HighLowManager className="h-full w-full" symbol={symbol} settings={settings} />
                    </div>
                    <div className="h-full w-128 border border-primary rounded-lg overflow-auto">
                      <FormManager className="h-full w-full" symbol={symbol} settings={settings} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          <MarketFooter market={market} price={price} settings={settings} />
        </div>
      </div>
    </div>
  )
}

/*


        <div className="p-2">
          <div className="flex flex-row justify-between ">
            <MarketNameDescription market={market} />
            {favorites != null && <MarketController market={market} isFavorite={isFavorite} />}
          </div>
          {display === MarketDisplay.Info && (
            <>
              <div className="flex flex-col gap-2 pt-2">
                <MarketContractDescription market={market} />
                <MarketSummaryDescription market={market} />
              </div>
              {hasNoPrices && (
                <div className="flex flex-row justify-end">
                  <button className="btn btn-sm btn-primary" disabled={market.priceCount > 0} onClick={() => ohlcLoadFor(market.symbol)}>
                    Load Data
                  </button>
                </div>
              )}
            </>
          )}
          {display === MarketDisplay.Line && <SymbolSparkline symbol={market?.symbol} />}
            </div>

*/
