import timerStart from "@/data/indexDB/controllers/timer/timerStart"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import formatValue from "@/utilities/formatValue"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol?: string | null | undefined
  showMultiples?: boolean | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractStrip({ symbol, showMultiples = false, name = "ContractStrip", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)

  const handlePlaceOrder = () => {}

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row justify-between items-center gap-2">
        <button className="btn btn-sm  btn-outline btn-primary ">Quarter</button>
        <button className="btn btn-sm btn-outline btn-primary ">Half</button>
        <button className="btn btn-sm btn-primary ">One</button>
        <button className="btn btn-sm btn-outline btn-primary ">Two</button>
        <div className="divider divider-horizontal"></div>
        <button className="btn btn-sm  btn-buy">Buy</button>
        <button className="btn btn-sm btn-outline  btn-sell">Sell</button>
        <div className="divider divider-horizontal"></div>
        <button className="btn btn-sm btn-primary " onClick={handlePlaceOrder}>
          Place the order
        </button>
      </div>
    </div>
  )
}
