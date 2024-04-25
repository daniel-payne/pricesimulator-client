import db from "@/data/indexDB/db"
import { Market } from "@/data/indexDB/types/Market"
import formatTimestamp from "@/utilities/formatTimestamp"

import { useLiveQuery } from "dexie-react-hooks"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsTest({ name = "MarketsTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <h1 className="text-lg">{name}</h1>

      <div className="flex flex-row flex-wrap gap-2">
        {markets?.map((market: Market) => {
          return (
            <div key={market.id} className="flex flex-col p-2 border-2 rounded">
              <div>
                {market.symbol} {market.name}
              </div>
              <div>
                {market.dataStatus} {market.dataCount}
              </div>
              <div>{formatTimestamp(market.firstTimestamp)} </div>
              <button className="btn btn-sm" onClick={() => db.synchronizeTrendForSymbol(market.symbol)}>
                Synchronize
              </button>
            </div>
          )
        })}
      </div>

      <div className="flex flex-row gap-2 py-2">
        <button className="btn btn-sm" onClick={() => db.synchronizeAllMarkets()}>
          Synchronize
        </button>
        <button className="btn btn-sm" onClick={() => db.synchronizeTrendForSymbols(["RR.F", "SB.F", "SL.f"])}>
          Synchronize RR.F SB.F SL.f Trends
        </button>
        <button className="btn btn-sm" onClick={() => db.synchronizeAllTrends()}>
          Synchronize All Trends
        </button>
      </div>
    </div>
  )
}
