import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Market } from "@/data/indexDB/types/Market"

import MarketFooter from "@/display/components/MarketFooter"
import MarketHeader from "@/display/components/MarketHeader"
import MarketChart from "@/display/components/charts/MarketChart"

import useDataForSymbol from "@/data/indexDB/hooks/useDataForSymbol"

import type { Price } from "@/data/indexDB/types/Price"
import DefaultComponent from "../DefaultComponent"

type ComponentProps = {
  market?: Market | undefined | null
  price?: Price | undefined | null

  showBehaviors?: boolean | undefined | null
  showActions?: boolean | undefined | null
  showChart: boolean | undefined | null
  showForm?: boolean | undefined | null

  tradeType?: string | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketOverview({
  market,
  price,

  showBehaviors,
  showActions,
  showChart,
  showForm,
  tradeType,

  name = "MarketOverview",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const data = useDataForSymbol(market?.symbol)

  return (
    <div {...rest} data-component={name}>
      <div className="h-full flex flex-col justify-between gap-2">
        <MarketHeader market={market} showBehaviors={showBehaviors} />

        <div className="flex-auto flex flex-row justify-between gap-2">
          <div className="flex-auto">{showChart && <MarketChart className="h-full w-full min-h-32" data={data} price={price} showYScale={false} />}</div>
          <div>{showForm && <DefaultComponent name="MarketForm" />}</div>
        </div>

        <MarketFooter market={market} price={price} showActions={showActions} tradeType={tradeType} />
      </div>
    </div>
  )
}
