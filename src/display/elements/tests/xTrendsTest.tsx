import synchronizeAllTrends from "@/data/indexDB/controllers/synchronize/synchronizeAllTrends"
import synchronizeTrendForSymbol from "@/data/indexDB/controllers/synchronize/synchronizeTrendForSymbol"
import synchronizeTrendForSymbols from "@/data/indexDB/controllers/synchronize/synchronizeTrendForSymbols"

import formatTimestamp from "@/utilities/formatTimestamp"

import type { HTMLAttributes, PropsWithChildren } from "react"

import useTrends from "@/data/indexDB/hooks/useTrends"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsTest({ name = "MarketsTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const trends = useTrends()

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Trends</h1>

        <div className="flex flex-row gap-2 p-2 bg-base-100">
          <button className="btn btn-sm" onClick={() => synchronizeTrendForSymbol("LC.F")}>
            Synchronize LC.F Trend
          </button>
          <button className="btn btn-sm" onClick={() => synchronizeTrendForSymbols(["RR.F", "SB.F", "SL.F"])}>
            Synchronize RR.F SB.F SL.F Trends
          </button>
          <button className="btn btn-sm" onClick={() => synchronizeAllTrends()}>
            Synchronize All Trends
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {trends?.map((trend) => {
            return (
              <div key={trend.symbol} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                <div className="font-bold">{trend.symbol}</div>
                <div className="text-xs">{trend.timestamps?.length} </div>
                <div className="text-xs">
                  {formatTimestamp(trend.timestamps?.[0])} - {formatTimestamp(trend.timestamps?.[trend.timestamps?.length - 1])}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
