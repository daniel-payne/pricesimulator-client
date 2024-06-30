// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
// import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
// import useTimer from "@/data/indexDB/hooks/useTimer"

import { type HTMLAttributes, type PropsWithChildren } from "react"
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
import DisplayOutcome from "../components/DisplayOutcome"
import inactiveTrades from "@/data/indexDB/controllers/clear/inactiveTrades"
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
  timer?: Timer | null | undefined

  settings?: Settings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractManager({ market, price, trade, timer, settings, name = "ContractManager", ...rest }: PropsWithChildren<ComponentProps>) {
  const { showMultiples = false } = settings || {}

  const symbol = market?.symbol
  // const market = useMarketForSymbol(symbol)
  // const price = useCurrentPriceForSymbol(symbol)
  // const trade = useActiveTradeForSymbol(symbol)

  // const timer = useTimer()

  const isOpen = trade?.status === TradeStatus.OPEN

  const handleOpen = async (settings: any) => {
    if (symbol) {
      const { direction, size } = settings
      await openContract(symbol, direction, size)

      timerStart()
    }
  }

  const handleClose = async () => {
    if (trade) {
      await closeContract(trade.id, false)
    }
  }

  const handleInactiveTrades = async () => {
    if (trade) {
      await inactiveTrades(trade.symbol)
    }
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="text-info p-2 text-lg font-bold">Instruction to Broker </div>

      <ContractDescription market={market} price={price} timer={timer} settings={{ showMultiples }} />
      {trade == null && <StartContract market={market} price={price} settings={{ showMultiples }} onOrder={handleOpen} />}
      {trade != null && isOpen == true && <StopContract market={market} price={price} trade={trade} settings={{ showMultiples }} onOrder={handleClose} />}
      {trade != null && isOpen == true && <DisplayMargin market={market} price={price} trade={trade} timer={timer} settings={{ showMultiples }} />}
      {trade != null && isOpen == false && <DisplayOutcome market={market} trade={trade} onStartAgain={handleInactiveTrades} />}

      {/* <TradeDescription trade={trade} /> */}
      {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}

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
