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

  const midPrice = price?.isMarketClosed ? price?.priorClose : price?.currentOpen
  const bidPrice = price?.currentBid
  const askPrice = price?.currentAsk

  const midValue = (midPrice ?? 0) * (market?.dollarModifier ?? 1)
  const bidValue = (bidPrice ?? 0) * (market?.dollarModifier ?? 1)
  const askValue = (askPrice ?? 0) * (market?.dollarModifier ?? 1)

  const contractPoints = market?.contractPoints

  const midContract = midValue * (market?.contractSize ?? 1)
  const bidContract = bidValue * (market?.contractSize ?? 1)
  const askContract = askValue * (market?.contractSize ?? 1)

  // const midPoints = (midPrice ?? 0) * (contractPoints ?? 1)
  const bidPoints = (bidPrice ?? 0) * (contractPoints ?? 1)
  const askPoints = (askPrice ?? 0) * (contractPoints ?? 1)

  const decimalPlaces = midValue < 1 ? 4 : 2

  const displayMidValue = formatValue(midValue, true, "USD", decimalPlaces)
  const displayBidValue = formatValue(bidValue, true, "USD", decimalPlaces)
  const displayAskValue = formatValue(askValue, true, "USD", decimalPlaces)

  // const displayMidPoints = formatValue(midPoints, false, "USD", 2)
  const displayBidPoints = formatValue(bidPoints, false, "USD", 2)
  const displayAskPoints = formatValue(askPoints, false, "USD", 2)

  const displayMidContract = formatValue(midContract, false)
  const displayBidContract = formatValue(bidContract, false)
  const displayAskContract = formatValue(askContract, false)

  const displayContractPoints = formatValue(contractPoints, true)

  const displayPricePoint = price?.isMarketClosed ? "fridays close" : "todays opening"

  const endOfContract = lastOfMonth(timer?.currentTimestamp, "WED", 3)

  const displayEndDate = formatTimestamp(endOfContract?.getTime())
  const displayEndDay = formatTimestampDay(endOfContract?.getTime())

  const brokerCharge = formatValue(7, false)

  return (
    <div {...rest} data-controller={name}>
      <div className="p-2">
        <div className="text-sm fg--heading">For a contract of {market?.name}, i.e.</div>
        <div className="text-sm fg--subheading">
          {market?.contractName} to be delivered on {displayEndDay}, <strong>{displayEndDate}</strong>
        </div>

        {showMultiples && (
          <>
            <div className="text-sm fg--subheading">
              <span>
                At {displayPricePoint} {market?.contractSize} {market?.contractUnit}
              </span>
              <span>
                was trading for you to sell at <strong>{displayAskValue}</strong>
              </span>
              <span>
                and buy at
                <strong>{displayBidValue}</strong>
              </span>
            </div>
            <div className="text-sm fg--subheading">
              A contract was trading for you to sell at <strong>{displayAskContract}</strong> and to buy at <strong>{displayBidContract}</strong>
            </div>
            <div className="text-sm fg--subheading">
              The broker will charge using a <strong>spread</strong> for this transaction
            </div>
          </>
        )}

        {!showMultiples && displayContractPoints == null && (
          <>
            <div className="text-sm fg--subheading">
              At {displayPricePoint} {market?.name} was <strong>{displayMidValue}</strong> per point
            </div>
            <div className="text-sm fg--subheading">
              A contract was trading at {displayPricePoint} for <strong>{displayMidContract}</strong>
            </div>
            <div className="text-sm fg--subheading">
              The broker will charge <strong>{brokerCharge}</strong> for this transaction
            </div>
          </>
        )}

        {!showMultiples && displayContractPoints != null && (
          <>
            <div className="text-sm fg--subheading">
              The contract size is {displayContractPoints} per index point
              {/* At {displayPricePoint} {market?.contractSize} {market?.contractUnit} was <strong>{displayMidValue}</strong> per {market?.contractUnit} */}
            </div>
            <div className="text-sm fg--subheading">
              A contract was trading for you to sell at <strong>{displayAskPoints}</strong> and to buy at <strong>{displayBidPoints}</strong>
            </div>
            <div className="text-sm fg--subheading">
              The broker will charge <strong>{brokerCharge}</strong> for this transaction
            </div>
          </>
        )}
      </div>
    </div>
  )
}
