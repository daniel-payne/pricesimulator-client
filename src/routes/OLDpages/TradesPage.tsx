import closeContract from "@/data/indexDB/controllers/close/closeContract"
import timerStop from "@/data/indexDB/controllers/timer/timerStop"
import useActiveTrades from "@/data/indexDB/hooks/useActiveTrades"
import useInactiveTrades from "@/data/indexDB/hooks/useInactiveTrades"

import TradeDetails from "@/display/OLDelements/TradeDetails"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TradesPage({ name = "TradesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const openTrades = useActiveTrades()
  const closedTrades = useInactiveTrades()

  const handleClose = (id: string) => {
    timerStop()

    if (id) {
      closeContract(id)
    }
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full p-6">
        <div className="flex flex-row flex-wrap gap-2">
          {openTrades?.map((trade) => (
            <TradeDetails key={trade.id} id={trade.id} onOrder={handleClose} />
          ))}
        </div>
        <div className="divider">Closed</div>
        <div className="flex flex-row flex-wrap gap-2">
          {closedTrades?.map((trade) => (
            <TradeDetails key={trade.id} id={trade.id} />
          ))}
        </div>
        {/* <pre>{JSON.stringify(openTrades, null, 2)}</pre>
        <hr />
        <pre>{JSON.stringify(closedTrades, null, 2)}</pre> */}
      </div>
    </div>
  )
}
