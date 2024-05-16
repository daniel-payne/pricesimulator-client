import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import synchronizeAllTrends from "@/data/indexDB/controllers/synchronize/synchronizeAllTrends"
import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"

// import formatTimestamp from "@/utilities/formatTimestamp"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function PricesTest({ name = "PricesTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const prices = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Trends</h1>
        <div className="flex flex-row gap-2 p-2 bg-base-100">
          <button className="btn btn-sm" onClick={() => synchronizeAllTrends()}>
            Synchronize All Trends
          </button>
          <button className="btn btn-sm" onClick={() => timerNextDay(true)}>
            Next Day
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {prices?.map((price) => {
            return (
              <div key={price.symbol} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                <div className="font-bold">{price.symbol}</div>
                <div className="text-xs"></div>
                <div className="text-xs"></div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
