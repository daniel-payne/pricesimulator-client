import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Market } from "@/data/indexDB/types/Market"
import MarketBehaviors from "@/display/controllers/behaviors/MarketBehaviors"

type ComponentProps = {
  market?: Market | undefined | null

  showBehaviors?: boolean | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketHeader({ market, showBehaviors = true, name = "MarketHeader", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-between gap-2">
        <div className="text-xl font-bold truncate">
          <span className="fg--heading">{market?.name}</span>
          <span className="fg--subheading ps-2 text-sm">{market?.description}</span>
        </div>
        {showBehaviors && <MarketBehaviors market={market} />}
      </div>
    </div>
  )
}
