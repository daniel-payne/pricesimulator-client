import closeContract from "@/data/indexDB/controllers/close/closeContract"
import useActiveTrades from "@/data/indexDB/hooks/useActiveTrades"
import useInactiveTrades from "@/data/indexDB/hooks/useInactiveTrades"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import { Trade } from "@/data/indexDB/types/Trade"
// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
// import useDataForSymbol from "@/data/indexDB/hooks/useDataForSymbol"

// import useMarkets from "@/data/indexDB/hooks/useMarkets"

// import type { Market } from "@/data/indexDB/types/Market"
// import formatNumber from "@/utilities/formatNumber"
// import formatTimestamp from "@/utilities/formatTimestamp"

import { useState, type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

// const PriceData = ({ symbol }: { symbol: string }) => {
//   const price = useCurrentPriceForSymbol(symbol)

//   const currentPrice = price?.isMarketClosed ? price.lastClose : price?.midDayPrice

//   const classNamesCurrentPrice = currentPrice == null ? "font-light" : "font-bold"
//   const displayCurrentPrice = currentPrice == null ? "No Current Price" : formatNumber(currentPrice, 6)

//   return (
//     <div className="">
//       <div>
//         <span className={classNamesCurrentPrice}>{displayCurrentPrice}</span>
//       </div>
//       {/* <div>{formatTimestamp(price?.timestamp)}</div>
//       <pre>{JSON.stringify(price, null, 2)}</pre> */}
//     </div>
//   )
// }

// const DataData = ({ symbol }: { symbol: string }) => {
//   const data = useDataForSymbol(symbol)

//   const count = data?.count ?? 0
//   const firstActiveTimestamp = data?.firstActiveTimestamp

//   const displayFirstActiveTimestamp = formatTimestamp(firstActiveTimestamp)

//   const classNamesCurrentPrice = count > 0 ? "font-bold" : "font-light"

//   return (
//     <div className="">
//       <span className={classNamesCurrentPrice}>{displayFirstActiveTimestamp}</span>
//       &nbsp;
//       <span className="text-xs">({count})</span>
//     </div>
//   )
// }

const ActiveTradeData = ({ trade }: { trade: Trade }) => {
  const market = useMarketForSymbol(trade.symbol)

  const handleCloseTrade = () => {
    closeContract(trade.id)
  }

  return (
    <div className="p-2 border border-primary rounded-lg  w-auto">
      <div className="truncated">
        <span className="text-primary">{trade.symbol}</span>
        <span className="text-secondary ps-2 text-xs">{trade.id}</span>
      </div>
      <pre>{JSON.stringify(trade, null, 2)}</pre>
      <pre>{JSON.stringify(market, null, 2)}</pre>
      <div>
        <button className="mt-2 btn btn-xs btn-primary" onClick={handleCloseTrade}>
          Close
        </button>
      </div>

      {/* <div className="text-secondary">{market.description} &nbsp;</div> */}

      {/* <DataData symbol={market.symbol} />
      <PriceData symbol={market.symbol} /> */}
    </div>
  )
}

export default function TradesData({ name = "TradesData", ...rest }: PropsWithChildren<ComponentProps>) {
  const [show, setShow] = useState(false)

  const activeTrades = useActiveTrades()
  const inactiveTrades = useInactiveTrades()

  const trades = show ? inactiveTrades : activeTrades

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">
        {name} &nbsp;
        <button className="btn btn-xs btn-primary" onClick={() => setShow(!show)}>
          {show ? "Inactive" : "Active"}
        </button>
      </h1>

      {/* <pre className="border border-primary m-2 p-2">{JSON.stringify(scenarios, null, 2)}</pre> */}

      <div className="flex-auto flex flex-row flex-wrap gap-2 justify-start items-center p-2 ">
        {trades?.map((trade) => (
          <ActiveTradeData trade={trade} key={trade.id} />
        ))}
      </div>
    </div>
  )
}
