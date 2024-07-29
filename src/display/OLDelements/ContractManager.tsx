// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
// import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
// import useTimer from "@/data/indexDB/hooks/useTimer"

import { useEffect, useState, type HTMLAttributes, type PropsWithChildren } from "react"
import StartContract from "./StartContract"
import ContractDescription from "./ContractDescription"
import openContract from "@/data/indexDB/controllers/open/openContract"
// import useActiveTradeForSymbol from "@/data/indexDB/hooks/useActiveTradeForSymbol"
import StopContract from "./StopContract"
import DisplayMargin from "./DisplayMargin"
import closeContract from "@/data/indexDB/controllers/close/closeContract"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import timerStop from "@/data/indexDB/controllers/timer/timerStop"
import { Market } from "@/data/indexDB/types/Market"
import { Price } from "@/data/indexDB/types/Price"
import { Trade } from "@/data/indexDB/types/Trade"
import { Timer } from "@/data/indexDB/types/Timer"
import { TradeStatus } from "@/data/indexDB/enums/TradeStatus"
// import TradeDetails from "./TradeDetails"
// import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
import DisplayOutcome from "../OLDcomponents/DisplayOutcome"

import { Margin } from "@/data/indexDB/types/Margin"
import { setState } from "@keldan-systems/state-mutex"
// import formatTimestampISO from "@/utilities/formatTimestampISO"
// import formatTimestampDay from "@/utilities/formatTimestampDay"
// import formatTimestamp from "@/utilities/formatTimestamp"

type Settings = {
  showMultiples?: boolean | null | undefined
}

type ComponentProps = {
  market: Market | null | undefined
  price?: Price | null | undefined
  trade?: Trade | null | undefined
  margin?: Margin | null | undefined
  timer?: Timer | null | undefined

  lastTrade?: Trade | null | undefined

  settings?: Settings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractManager({
  market,
  price,
  trade,
  lastTrade,
  margin,
  timer,
  settings,
  name = "ContractManager",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const { showMultiples = false } = settings || {}

  const symbol = market?.symbol
  // const market = useMarketForSymbol(symbol)
  // const price = useCurrentPriceForSymbol(symbol)
  // const trade = useActiveTradeForSymbol(symbol)

  // const timer = useTimer()

  const isOpen = trade?.status === TradeStatus.OPEN
  const isLastTradeClosed = lastTrade?.status === TradeStatus.CLOSED

  const handleOpenContract = async (settings: any) => {
    if (symbol) {
      const { direction, size } = settings
      await openContract(symbol, direction, size)

      timerStart()
    }
  }

  const handleCloseContract = async () => {
    if (trade) {
      await closeContract(trade.id, false)
    }
  }

  const handleClearClosedMargins = async () => {
    if (lastTrade) {
      setState("LAST-TRADE-FOR-" + lastTrade.symbol, undefined)
    }
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="text-info p-2 text-lg font-bold">Instruction to Broker </div>

      <ContractDescription market={market} price={price} timer={timer} settings={{ showMultiples }} />
      {trade == null && lastTrade == null && <StartContract market={market} price={price} settings={{ showMultiples }} onOrder={handleOpenContract} />}
      {trade != null && isOpen == true && (
        <StopContract market={market} price={price} trade={trade} settings={{ showMultiples }} onOrder={handleCloseContract} />
      )}
      {trade != null && isOpen == true && (
        <DisplayMargin market={market} price={price} trade={trade} margin={margin} timer={timer} settings={{ showMultiples }} />
      )}
      {lastTrade != null && isLastTradeClosed == true && (
        <DisplayOutcome market={market} trade={lastTrade} margin={margin} onStartAgain={handleClearClosedMargins} />
      )}

      {/* <TradeDescription trade={trade} /> */}
      {/* <pre>{JSON.stringify(lastTrade, null, 2)}</pre> */}

      {/* <pre>{JSON.stringify(market, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(price, null, 2)}</pre> */}
      {/* <div className="divider">You Currently Own</div>
      <div className="flex flex-col justify-start items-center p-2 gap-4">
        <div>
          <button className="btn btn-sm btn-outline  btn-primary ">One</button> contract to <button className="btn btn-sm btn-outline  btn-buy">Buy</button>
        </div>
        <div>
          You paid <span className="border border-primary rounded p-2 m-1">$22,422</span> for this contract
        </div>
        <div>At close of trading yesterday </div>
        <div>
          You would have made <span className="text-profit border border-profit rounded p-2 m-1 font-bold">$403</span>
        </div>
        <div>
          The contract has <span className="text-warning border border-warning rounded p-2 m-1  ">26</span>days to run
        </div>
      </div> */}
    </div>
  )
}
