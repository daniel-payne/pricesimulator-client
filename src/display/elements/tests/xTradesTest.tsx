import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

// import formatTimestamp from "@/utilities/formatTimestamp"

import { useState, type HTMLAttributes, type PropsWithChildren } from "react"

import openTrade from "@/data/indexDB/controllers/open/openTrade"
import closeTrade from "@/data/indexDB/controllers/close/closeTrade"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TradesTest({ name = "TradesTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const [symbol, setSymbol] = useState("LC.F")
  const [amount, setAmount] = useState("1000")
  const [direction, setDirection] = useState("BUY")

  const trades = useLiveQuery(async () => {
    return await db.trades?.toArray()
  })

  const handleOpenTrade = async () => {
    const notionalAmount = Number.parseFloat(amount)
    const tradeDirection = direction.toUpperCase() === "SELL" ? "PUT" : "CALL"

    const trade = await openTrade(symbol, notionalAmount, tradeDirection)

    return trade
  }

  const handleCloseTrade = async (reference: string) => {
    await closeTrade(reference)
  }

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Trends</h1>
        <div className="flex flex-row gap-2 p-2 bg-base-100 justify-start items-baseline">
          <label className="input input-bordered flex items-center gap-2 w-64">
            Symbol
            <input type="text" className="grow" placeholder="LE.C" value={symbol} onChange={(e) => setSymbol(e.target.value)} />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-64">
            Amount
            <input type="text" className="grow" placeholder="1000" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <label className="input input-bordered flex items-center gap-2 w-64">
            Direction
            <input type="text" className="grow" placeholder="SELL" value={direction} onChange={(e) => setDirection(e.target.value)} />
          </label>
          <button className="btn btn-primary" onClick={handleOpenTrade}>
            Open Trade
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {trades
            ?.filter((trade) => trade.isTradeActive === true)
            .map((trade) => {
              return (
                <div key={trade.reference} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                  <div className="font-bold">{trade.id}</div>
                  <div className="text-xs">
                    <pre>{JSON.stringify(trade, null, 2)}</pre>
                  </div>
                  <div className="text-xs"></div>
                  <button className="btn btn-sm" onClick={() => handleCloseTrade(trade.reference)}>
                    CloseTrade
                  </button>
                </div>
              )
            })}
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {trades
            ?.filter((trade) => trade.isTradeActive !== true)
            .map((trade) => {
              return (
                <div key={trade.reference} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                  <div className="font-bold">{trade.id}</div>
                  <div className="text-xs">
                    <pre>{JSON.stringify(trade, null, 2)}</pre>
                  </div>
                  <div className="text-xs"></div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
