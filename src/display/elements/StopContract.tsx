import { Market } from "@/data/indexDB/types/Market"
import { Price } from "@/data/indexDB/types/Price"
import { Trade } from "@/data/indexDB/types/Trade"
import { type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentSettings = {
  showMultiples?: boolean | null | undefined
}

type ComponentResponse = { direction: "CALL" | "PUT"; size: 0.25 | 0.5 | 1 | 2 }

type ComponentProps = {
  market?: Market | null | undefined
  price?: Price | null | undefined
  trade?: Trade | null | undefined

  settings?: ComponentSettings

  onOrder?: (response: ComponentResponse) => void

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StopContract({ market, price, trade, settings, onOrder, name = "StopContract", ...rest }: PropsWithChildren<ComponentProps>) {
  if (trade == null || market == null) {
    return "missins"
  }

  const { showMultiples = false } = settings || {}

  const displayCallLabel = showMultiples ? "Call" : "Buying"
  const displayPutLabel = showMultiples ? "Put" : "Selling"

  const displayClassesSizeQuarter = trade.size === 0.25 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeHalf = trade.size === 0.5 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeOne = trade.size === 1 ? "btn btn-sm btn-primary" : "hidden"
  const displayClassesSizeTwo = trade.size === 2 ? "btn btn-sm btn-primary" : "hidden"

  const displayOrderEvent = price?.isMarketClosed ? "As soon as the market opens" : "As soon as you can before the market closes today"

  const classNamesBuy = trade.direction === "PUT" ? "btn btn-sm btn-primary btn-buy" : "hidden"
  const classNamesSell = trade.direction === "CALL" ? "btn btn-sm btn-primary btn-sell" : "hidden"

  let contractPrefix = ""
  let contractSuffix = ""

  if (trade.size === 0.25) {
    contractPrefix = "of a"
  } else if (trade.size === 0.5) {
    contractPrefix = "a"
  } else if (trade.size === 2) {
    contractSuffix = "s"
  }

  const handlePlaceOrder = () => {
    if (onOrder) {
      onOrder({ direction: trade?.direction, size: trade.size })
    }
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="p-2">
        <div className="divider">I would like to close a position</div>
        <div className="flex flex-col justify-start items-center p-2 gap-4">
          <div className="flex flex-row gap-2 justify-center items-center">
            <div>For</div>
            {showMultiples && <button className={displayClassesSizeQuarter}>Quarter</button>}
            {showMultiples && <button className={displayClassesSizeHalf}>Half</button>}
            <button className={displayClassesSizeOne}>One</button>
            {showMultiples && <button className={displayClassesSizeTwo}>Two</button>}
            <div>
              <span>{contractPrefix}</span> Contract<span>{contractSuffix}</span>
            </div>
          </div>

          <div className="flex flex-row gap-2 justify-center items-center">
            <div>By</div>
            <button className={classNamesBuy}>{displayCallLabel}</button>
            <button className={classNamesSell}>{displayPutLabel}</button>
            <div>{market?.name}</div>
          </div>

          <button className="btn  btn-primary rounded-3xl " onClick={handlePlaceOrder}>
            Place the order
          </button>
          <div className="fg--subheading">{displayOrderEvent}</div>
        </div>
      </div>
    </div>
  )
}
