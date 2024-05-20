import MarketOverview from "../elements/MarketOverview"

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Category } from "@/data/indexDB/types/Category"
import { Status } from "@/data/indexDB/types/Status"

type ComponentProps = {
  status?: Status
  category: Category

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CategoryGroup({ status, category, name = "CategoryGroup", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = category.markets.filter((market) => {
    const currentIndexForSymbol = status?.currentIndexForSymbol ?? {}
    const currentIndex = currentIndexForSymbol[market.symbol] ?? ({} as any)

    return currentIndex.isMarketActive == true
  })

  return (
    <div {...rest} data-component={name}>
      <div className="mb-2 fg--heading font-bold text-xl">{category.description}</div>

      <div className="flex-auto flex flex-row flex-wrap gap-0 justify-start items-start">
        {markets?.map((market) => (
          <MarketOverview className="p-2 w-[100%] sm:w-[50%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-64" symbol={market.symbol} key={market.symbol} />
        ))}
      </div>
    </div>
  )
}
