import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useTimer from "@/data/indexDB/hooks/useTimer"

import { type HTMLAttributes, type PropsWithChildren } from "react"
import StartContract from "./StartContract"
import ContractDescription from "./ContractDescription"
import openContract from "@/data/indexDB/controllers/open/openContract"
import useActiveTradeForSymbol from "@/data/indexDB/hooks/useActiveTradeForSymbol"
import StopContract from "./StopContract"
import DisplayContract from "./DisplayContract"
import closeContract from "@/data/indexDB/controllers/close/closeContract"
import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"

type Settings = {
  showMultiples?: boolean | null | undefined
}

type ComponentProps = {
  symbol?: string | null | undefined

  settings?: Settings

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractManager({ symbol, settings, name = "ContractManager", ...rest }: PropsWithChildren<ComponentProps>) {
  const { showMultiples = false } = settings || {}

  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)
  const trade = useActiveTradeForSymbol(symbol)

  const timer = useTimer()

  const handleOpen = async (settings: any) => {
    if (symbol) {
      const { direction, size } = settings
      await openContract(symbol, direction, size)

      timerStart()
    }
  }

  const handleClose = () => {
    timerStop()

    if (trade) {
      closeContract(trade.id)
    }
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="text-info p-2 text-lg font-bold">Instruction to Broker </div>

      <ContractDescription market={market} price={price} timer={timer} settings={{ showMultiples }} />
      {trade == null && <StartContract market={market} price={price} settings={{ showMultiples }} onOrder={handleOpen} />}
      {trade != null && <StopContract market={market} price={price} trade={trade} settings={{ showMultiples }} onOrder={handleClose} />}
      {trade != null && <DisplayContract market={market} price={price} trade={trade} settings={{ showMultiples }} />}

      {/* <TradeDescription trade={trade} /> */}
      {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}

      {/* <pre>{JSON.stringify(market, null, 2)}</pre> */}
      {/* <pre>{JSON.stringify(trade, null, 2)}</pre> */}
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
