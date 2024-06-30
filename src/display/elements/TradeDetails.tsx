// import { Market } from "@/data/indexDB/types/Market"
// import { Trade } from "@/data/indexDB/types/Trade"

import { TradeStatus } from "@/data/indexDB/enums/TradeStatus"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useTrade from "@/data/indexDB/hooks/useTrade"

import differenceInTimestamps from "@/utilities/differenceInTimestamps"

import formatTimestamp from "@/utilities/formatTimestamp"
import formatValue from "@/utilities/formatValue"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  id?: string | undefined | null

  onOrder?: (id: string) => void

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TradeDetails({ id, onOrder, name = "TradeDetails", ...rest }: PropsWithChildren<ComponentProps>) {
  const trade = useTrade(id)
  const market = useMarketForSymbol(trade?.symbol)

  if (trade == null) {
    return <div>Trade not found{id}</div>
  }

  const isOpen = trade.status === TradeStatus.OPEN
  const isClosed = trade.status === TradeStatus.CLOSED

  const profit = isClosed ? trade.profit : trade.margin?.currentProfit ?? 0

  const displayProfit = formatValue(profit)
  const classNameProfit = profit > 0 ? "w-24 text-center rounded-lg p-2 bg-profit" : "w-24 text-center rounded-lg p-2 bg-loss"

  let displayAmount
  let displayDates

  if (trade.direction === "CALL") {
    displayAmount = "CALL"
  } else {
    displayAmount = "PUT"
  }

  if (trade.size == null) {
    displayAmount = displayAmount + " " + formatValue(trade.notional, false, "USD")
  } else {
    displayAmount = displayAmount + " " + trade.size + " @ " + market?.contractName
  }

  if (trade.status === TradeStatus.OPEN) {
    displayDates = differenceInTimestamps(trade.expiryTimestamp, trade.entryTimestamp, "days") + " days to run"
  } else if (trade.status === TradeStatus.CLOSED) {
    displayDates =
      "Ran for " + differenceInTimestamps(trade.exitTimestamp, trade.entryTimestamp, "days") + " days until " + formatTimestamp(trade.exitTimestamp)
  }

  const handlePlaceOrder = () => {
    if (onOrder) {
      onOrder(trade.id)
    }
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="p-2 w-96 bg--card rounded-xl shadow-xl relative" key={trade.id}>
        <div className="absolute top-2 right-2 opacity-10 text-4xl">{trade.no}</div>
        <div className="flex flex-row gap-2 z-20 items-baseline">
          <div className="text-info text-xl">{market?.name}</div>
          <div className="fg--subheading">{trade.symbol} </div>
          {/* <div className="fg--subheading">{trade.id}</div> */}
        </div>

        <div>{displayAmount}</div>
        <div>{displayDates}</div>

        {isOpen && (
          <div className="flex flex-row justify-between py-2">
            <button className="btn  btn-primary rounded-3xl " onClick={handlePlaceOrder}>
              Close the trade
            </button>
            <div className={classNameProfit}>{displayProfit}</div>
          </div>
        )}

        {isClosed && (
          <div className="flex flex-row justify-end">
            <div className={classNameProfit}>{displayProfit}</div>
          </div>
        )}

        {/* <pre>{JSON.stringify(market, null, 2)}</pre> */}
      </div>
    </div>
  )
}
