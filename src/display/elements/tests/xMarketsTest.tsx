import synchronizeAllMarkets from "@/data/indexDB/controllers/synchronize/synchronizeAllMarkets"

import formatTimestamp from "@/utilities/formatTimestamp"
import useMarkets from "@/data/indexDB/hooks/useMarkets"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsTest({ name = "MarketsTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useMarkets()

  return (
    <div {...rest} data-controller={name}>
      <div className="border shadow-xl p-2 bg-base-200">
        <p className="font-bold text-xl p-4">Markets</p>
        <div className="flex flex-row gap-2 p-2 bg-base-100">
          <button className="btn btn-sm" onClick={() => synchronizeAllMarkets()}>
            Synchronize All Markets
          </button>
        </div>
        <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
          {markets?.map((market) => {
            return (
              <div key={market.id} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                <div className="font-bold">{market.symbol}</div>
                <div>{market.name}</div>
                <div className="text-xs">{market.description}&nbsp;</div>
                <div className="text-xs">currentIndex : {market.currentIndex}&nbsp;</div>
                <div className="text-xs">marketActive : {JSON.stringify(market.isMarketActive)}&nbsp;</div>
                <div className="text-xs">marketOpen : {JSON.stringify(market.isOpen)}</div>
                <div className="text-xs">
                  marketStatus : {market.dataStatus} {market.dataCount}
                </div>

                <div className="text-xs">
                  {formatTimestamp(market.firstTimestamp)} - {formatTimestamp(market.lastTimestamp)}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
