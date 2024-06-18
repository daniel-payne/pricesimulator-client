import { Market } from "@/data/indexDB/types/Market"
import { Price } from "@/data/indexDB/types/Price"
import { Trade } from "@/data/indexDB/types/Trade"
import formatNumber from "@/utilities/formatNumber"
import formatValue from "@/utilities/formatValue"
import { type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentSettings = {
  showMultiples?: boolean | null | undefined
}

type ComponentProps = {
  market?: Market | null | undefined
  price?: Price | null | undefined
  trade?: Trade | null | undefined

  settings?: ComponentSettings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DisplayContract({ market, trade, settings, name = "DisplayContract", ...rest }: PropsWithChildren<ComponentProps>) {
  if (trade == null || market == null) {
    return null
  }

  const { showMultiples = false } = settings || {}

  const displayCallLabel = showMultiples ? "Call" : "Buy"
  const displayPutLabel = showMultiples ? "Put" : "Sell"

  const displayClassesSizeQuarter = trade.size === 0.25 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeHalf = trade.size === 0.5 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeOne = trade.size === 1 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeTwo = trade.size === 2 ? "btn btn-sm btn-primary" : "hidden"

  const classNamesBuy = trade.direction === "CALL" ? "btn btn-sm btn-primary btn-buy" : "hidden"
  const classNamesSell = trade.direction === "PUT" ? "btn btn-sm btn-primary btn-sell" : "hidden"

  const classNamePrice = trade.currentProfit > 0 ? "text-profit" : "text-loss"
  const classNameOutcome = trade.currentProfit > 0 ? "rounded-lg p-2 bg-profit" : "rounded-lg p-2 bg-loss"

  let contractPrefix = ""
  let contractSuffix = ""

  if (trade.size === 0.25) {
    contractPrefix = "of a"
  } else if (trade.size === 0.5) {
    contractPrefix = "a"
  } else if (trade.size === 2) {
    contractSuffix = "s"
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="p-2">
        <div className="divider">I currently own</div>
        <div className="flex flex-col justify-start items-center p-2 gap-4">
          <div className="flex flex-row gap-2 justify-center items-center">
            {showMultiples && <button className={displayClassesSizeQuarter}>Quarter</button>}
            {showMultiples && <button className={displayClassesSizeHalf}>Half</button>}
            <button className={displayClassesSizeOne}>One</button>
            {showMultiples && <button className={displayClassesSizeTwo}>Two</button>}
            <div>
              <span>{contractPrefix}</span> Contract<span>{contractSuffix}</span>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center">
            <div>To</div>
            <button className={classNamesBuy}>{displayCallLabel}</button>
            <button className={classNamesSell}>{displayPutLabel}</button>
            <div>{market?.name}</div>
            <div className="fg--subheading">@</div>
            <div className={classNamePrice}>{formatNumber(trade.entryPrice)}</div>
          </div>

          {/* <button className="btn  btn-primary rounded-3xl " onClick={handlePlaceOrder}>
            Place the order
          </button> */}
          <div className="flex flex-row gap-2 justify-center items-center">
            <div className="fg--subheading">Currently worth</div>
            <div className={classNameOutcome}>${formatValue(Math.abs(trade.currentProfit), false)}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
