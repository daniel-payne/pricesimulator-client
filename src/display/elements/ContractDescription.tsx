import { Market } from "@/data/indexDB/types/Market"
import { Price } from "@/data/indexDB/types/Price"
import { Timer } from "@/data/indexDB/types/Timer"
import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import formatValue from "@/utilities/formatValue"
import lastOfMonth from "@/utilities/lastOfMonth"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentSettings = {
  showMultiples?: boolean | null | undefined
}

type ComponentProps = {
  market?: Market | null | undefined
  price?: Price | null | undefined
  timer?: Timer | null | undefined

  settings?: ComponentSettings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractDescription({ market, price, timer, settings, name = "ContractDescription", ...rest }: PropsWithChildren<ComponentProps>) {
  const { showMultiples = false } = settings || {}

  const lastClosingPrice = price?.lastClosingPrice
  const bidPrice = price?.bid
  const askPrice = price?.ask

  //TODO MAKE contract price here <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  const displayClosingPrice = formatValue(lastClosingPrice, false)
  const displayBidPrice = formatValue(bidPrice, false)
  const displayAskPrice = formatValue(askPrice, false)

  // const closingValue = price?.midRangePrice ? formatValue(price?.lastClosingPrice * market?.contractSize * market?.dollarModifier, false) : "missing"
  // const bidValue = price?.bid ? formatValue(price?.bid * market?.contractSize * market?.dollarModifier, false) : "missing"
  // const askValue = price?.ask ? formatValue(price?.ask * market?.contractSize * market?.dollarModifier, false) : "missing"

  const endOfContract = lastOfMonth(timer?.currentTimestamp, "WED", 3)

  const displayEndDate = formatTimestamp(endOfContract?.getTime())
  const displayEndDay = formatTimestampDay(endOfContract?.getTime())

  const brokerCharge = formatValue(7, false)

  return (
    <div {...rest} data-controller={name}>
      <div className="p-2">
        <div className="text-sm fg--heading">For a contract of {market?.name}, i.e.</div>
        <div className="text-sm fg--subheading">
          {market?.contractName} to be delivered on {displayEndDay}, {displayEndDate}
        </div>

        {showMultiples && (
          <>
            <div className="text-sm fg--subheading">
              That was trading yesterday, bid at ${displayBidPrice}, ask at ${displayAskPrice}
            </div>
            <div className="text-sm fg--subheading">
              The broker will charge using a <strong>spread</strong> for this transaction
            </div>
          </>
        )}
        {!showMultiples && (
          <>
            <div className="text-sm fg--subheading">That was trading yesterday for ${displayClosingPrice}</div>
            <div className="text-sm fg--subheading">
              The broker will charge <strong>${brokerCharge}</strong> for this transaction
            </div>
          </>
        )}
      </div>
    </div>
  )
}
