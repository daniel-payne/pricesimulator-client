import useTrades, { TradeStatus } from "@/data/indexDB/hooks/useTrades"
import MarketContract from "@/display/elements/MarketContract"
import formatTimestamp from "@/utilities/formatTimestamp"
import formatValue from "@/utilities/formatValue"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { useParams } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TradesPage({ name = "TradesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const openTrades = useTrades(TradeStatus.OPEN)
  const closedTrades = useTrades(TradeStatus.CLOSED)

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full p-6">
        <div className="flex flex-row flex-wrap gap-2">
          {openTrades?.map((trade) => (
            <div className="p-2 w-96 bg--card rounded-xl shadow-xl " key={trade.id}>
              <div>
                {trade.symbol} {trade.id}
              </div>
              <div>
                {formatTimestamp(trade.entryTimestamp)} {formatTimestamp(trade.exitTimestamp)}
              </div>
              <div>
                {trade.entryPrice} {trade.exitPrice}
              </div>
              <div>
                {trade.direction} {trade.entryValue}
              </div>
              <div>{formatValue(trade.profit)}</div>

              {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}
            </div>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          {closedTrades?.map((trade) => (
            <div className="p-2 w-96 bg--card rounded-xl shadow-xl " key={trade.id}>
              <div>
                {trade.symbol} {trade.id}
              </div>
              <div>
                {formatTimestamp(trade.entryTimestamp)} {formatTimestamp(trade.exitTimestamp)}
              </div>
              <div>
                {trade.entryPrice} {trade.exitPrice}
              </div>
              <div>
                {trade.direction} {trade.entryValue}
              </div>
              <div>{formatValue(trade.profit)}</div>

              {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}
            </div>
          ))}
        </div>
        {/* <pre>{JSON.stringify(openTrades, null, 2)}</pre>
        <hr />
        <pre>{JSON.stringify(closedTrades, null, 2)}</pre> */}
      </div>
    </div>
  )
}
