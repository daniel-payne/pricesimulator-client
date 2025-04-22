import { MarketOrNothing } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"
import MarketNameDescription from "./MarketNameDescription"
import MarketController from "./MarketController"



import { Settings } from "../Settings"

type ComponentProps = {
  market: MarketOrNothing

  settings?: Settings
  favoriteSymbols?: Array<string>

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketHeader({ market, settings = {}, favoriteSymbols = [], name = "MarketHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  const { showController } = settings

  const isFavorite = favoriteSymbols?.includes(market?.symbol ?? "MISSING")

  return (
    <div {...rest} data-controller={name}>
      <div className="h-full w-full flex flex-row justify-between ">
        <MarketNameDescription className="truncate pe-2" market={market} />
        {showController && <MarketController market={market} isFavorite={isFavorite} />}
      </div>
    </div>
  )
}
