import { Market } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"

import YesterdayMovementDisplay from "./displays/YesterdayMovementDisplay"
import CurrentOpenDisplay from "./displays/CurrentOpenDisplay"
import { Price } from "@/data/indexDB/types/Price"
import { Status } from "@/data/indexDB/types/Status"
import formatTimestamp from "@/utilities/formatTimestamp"

type ComponentProps = {
  market?: Market | undefined | null
  price?: Price | undefined | null
  status?: Status | undefined | null

  showActions?: boolean | undefined | null
  showForm?: boolean | undefined | null
  tradeType?: string | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketFooter({
  price,
  status,
  showActions = true,

  tradeType = undefined,
  name = "MarketFooter",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  if (price == null) {
    return <div className="fg--subheading">Trading from {formatTimestamp(status?.firstActiveTimestamp)} </div>
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-between gap-2">
        <div className="flex flex-row justify-between items-center gap-2">
          <YesterdayMovementDisplay price={price} />
          <CurrentOpenDisplay price={price} />
        </div>
        {showActions === true && (
          <>
            {tradeType === "dollar" && (
              <div className="flex flex-row justify-between items-center gap-2">
                <input className="input input-sm w-[76px] font-bold" placeholder="$1,000" />
                <button className="btn btn-xs  btn-buy">Buy</button>
                <button className="btn btn-xs  btn-sell">Sell</button>
              </div>
            )}
            {tradeType === "contract" && (
              <div className="flex flex-row justify-between items-center gap-2">
                <div className="flex flex-row justify-between items-center gap-2">
                  <button className="btn btn-sm  btn-outline btn-primary ">Quarter</button>
                  <button className="btn btn-sm btn-outline btn-primary ">Half</button>
                  <button className="btn btn-sm btn-primary ">One</button>
                  <button className="btn btn-sm btn-outline btn-primary ">Two</button>
                  <div className="divider divider-horizontal"></div>
                  <button className="btn btn-sm  btn-buy">Buy</button>
                  <button className="btn btn-sm btn-outline  btn-sell">Sell</button>
                  <div className="divider divider-horizontal"></div>
                  <button className="btn btn-sm btn-primary rounded-3xl">Place the order</button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
