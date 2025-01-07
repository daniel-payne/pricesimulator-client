import { MarketOrNothing } from "@/data/indexDB/types/Market"
import { PriceOrNothing } from "@/data/indexDB/types/Price"
import { TimerOrNothing } from "@/data/indexDB/types/Timer"

import formatIndexAsDate from "@/utilities/formatIndexAsDate"
import formatIndexAsDay from "@/utilities/formatIndexAsDay"

import formatValue from "@/utilities/formatValue"

import formatDateAsIndex from "@/utilities/formatDateAsIndex"

import type { HTMLAttributes, PropsWithChildren } from "react"
import lastIndexOfMonth from "@/utilities/lastIndexOfMonth"
import formatNumber from "@/utilities/formatNumber"

type ComponentSettings = {
  showMultiples?: boolean | null | undefined
}

type ComponentProps = {
  market?: MarketOrNothing
  price?: PriceOrNothing
  timer?: TimerOrNothing

  settings?: ComponentSettings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractDescription({ market, price, timer, settings, name = "ContractDescription", ...rest }: PropsWithChildren<ComponentProps>) {
  if (market == null || price == null || timer == null) {
    return null
  }

  const { showMultiples = false } = settings || {}

  const midPrice = price?.isMarketClosed ? price?.priorClose : price?.currentOpen
  const bidPrice = price?.isMarketClosed ? price?.priorClosingBid : price?.currentBid
  const askPrice = price?.isMarketClosed ? price?.priorClosingAsk : price?.currentAsk

  const midValue = (midPrice ?? 0) * (market?.priceModifier ?? 1)
  const bidValue = (bidPrice ?? 0) * (market?.priceModifier ?? 1)
  const askValue = (askPrice ?? 0) * (market?.priceModifier ?? 1)

  const contractPoints = ((market?.contractSize ?? 1) / (market?.priceSize ?? 1)) * (market?.priceModifier ?? 1)

  const midContract = midValue * (market?.contractSize ?? 1)
  const bidContract = bidValue * (market?.contractSize ?? 1)
  const askContract = askValue * (market?.contractSize ?? 1)

  // const midPoints = (midPrice ?? 0) * (contractPoints ?? 1)
  // const bidPoints = (bidPrice ?? 0) * (contractPoints ?? 1)
  // const askPoints = (askPrice ?? 0) * (contractPoints ?? 1)

  // const decimalPlaces = market?.priceDecimals ?? 6

  // const displayMidValue = formatValue(midValue, true, "USD", decimalPlaces)
  // const displayBidValue = formatValue(bidValue, true, "USD", decimalPlaces)
  // const displayAskValue = formatValue(askValue, true, "USD", decimalPlaces)

  // const displayMidPoints = formatValue(midPoints, false, "USD", 2)
  // const displayBidPoints = formatValue(bidPoints, false, "USD", 2)
  // const displayAskPoints = formatValue(askPoints, false, "USD", 2)

  const displayMidContract = formatValue(midContract, false)
  const displayBidContract = formatValue(bidContract, false)
  const displayAskContract = formatValue(askContract, false)

  const displayContractPoints = formatValue(contractPoints, true)

  const displayPricePoint = price?.isMarketClosed ? "fridays close" : "todays opening"

  const endOfContractIndex = lastIndexOfMonth(timer?.currentIndex, "WED", 3)

  const brokerCharge = formatValue(7, false)

  const displayEndDate = formatIndexAsDate(endOfContractIndex)
  const displayEndDay = formatIndexAsDay(endOfContractIndex)

  const displayInstructions = showMultiples ? "Instructions to Broker" : "Instructions to Market"

  const displayTradingPoints = showMultiples ? `${displayAskContract} to buy and ${displayBidContract} to sell` : displayMidContract

  const displayBrokerCharge = showMultiples ? 'A spread for this transaction' : `${brokerCharge} for this transaction`

  return (
    <div {...rest} data-controller={name}>
      <div className="h-full w-full p-2">
        <div className="divider">{displayInstructions}</div>
        <div className="max-h-104 w-full p-2 overflow-auto">

          <div className="text-sm fg--subheading mb-2">I want to enter into a contract for {market?.name}, i.e.</div>

          <div className="text-sm fg--subheading">The contract is for</div>
          <div className="text-sm fg--heading ps-4 mb-2">{formatNumber(market?.contractSize, 0)} {market?.contractUnit} of {market?.name}</div>

          <div className="text-sm fg--subheading">To be delivered on</div>
          <div className="text-sm fg--heading ps-4 mb-2">{displayEndDay} {displayEndDate}</div>

          <div className="text-sm fg--subheading">One contract is aproxmatly</div>
          <div className="text-sm fg--heading ps-4 mb-2">{market?.contractName}</div>

          <div className="text-sm fg--subheading">The Price is displayed as</div>
          <div className="text-sm fg--heading ps-4 mb-2">US {market?.priceModifier === '0.01' ? '¢' : '$'} per {market?.priceSize} {market?.contractUnit}</div>

          <div className="text-sm fg--subheading">The profit & Loss is aproxmatly</div>
          <div className="text-sm fg--heading ps-4 mb-2">{displayContractPoints} per index point</div>

          <div className="text-sm fg--subheading">At {displayPricePoint} this contract was trading for about</div>
          <div className="text-sm fg--heading ps-4 mb-2">{displayTradingPoints}</div>

          <div className="text-sm fg--subheading">The broker will charge</div>
          <div className="text-sm fg--heading ps-4 mb-2">{displayBrokerCharge}</div>

        </div>
      </div>
    </div>
  )
}
