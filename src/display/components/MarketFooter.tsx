import type { MarketOrNothing } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"

import YesterdayMovementDisplay from "./YesterdayMovementDisplay"
import CurrentOpenDisplay from "./CurrentOpenDisplay"
import { PriceOrNothing } from "@/data/indexDB/types/Price"

import { Settings } from "../Settings"
import ActionManager from "../coordinators/ActionManager"

type ComponentProps = {
  market: MarketOrNothing
  price?: PriceOrNothing

  settings?: Settings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketFooter({ market, price, settings = {}, name = "MarketFooter", ...rest }: PropsWithChildren<ComponentProps>) {
  if (market == null || price == null) {
    return
  }

  const { showAction, showSummary } = settings

  const hasNoPrices = price == null
  const hasPrices = !hasNoPrices

  // const actions = useActionsSelection()

  return (
    <div {...rest} data-controller={name}>

      <div className="h-full w-full flex flex-row justify-between ">
        <div className="flex-auto flex flex-row gap-2 items-center">
          {hasPrices && showSummary && (
            <>
              <YesterdayMovementDisplay price={price} />
              <CurrentOpenDisplay market={market} price={price} />
            </>
          )}
          {hasNoPrices && <div className="text-xs text-secondary opacity-50">Market Not Active</div>}
        </div>
        <div className="flex-auto flex flex-row gap-2 justify-end items-center">
          {showAction && <ActionManager symbol={market?.symbol} settings={settings} />}
        </div>
      </div>
    </div>
  )
}
