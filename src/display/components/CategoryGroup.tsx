import MarketOverview from "../elements/MarketOverview"

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Category } from "@/data/indexDB/types/Category"
import { Status } from "@/data/indexDB/types/Status"

import { useSearchParams } from "react-router-dom"

type ComponentProps = {
  status?: Status
  category: Category

  name?: string
} & HTMLAttributes<HTMLDivElement>

const LARGE_CLASSNAMES = "p-2 w-[100%] sm:w-[50%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-64"
const COMPACT_CLASSNAMES = "p-2 w-[100%] sm:w-[33.3%] md:w-[25%] lg:w-[20%] xl:w-[12.5%] h-24"

export default function CategoryGroup({ status, category, name = "CategoryGroup", ...rest }: PropsWithChildren<ComponentProps>) {
  const [searchParams] = useSearchParams()

  const markets = category.markets.filter((market) => {
    const currentIndexForSymbol = status?.currentIndexForSymbol ?? {}
    const currentIndex = currentIndexForSymbol[market.symbol] ?? ({} as any)

    return currentIndex.isMarketActive === true
  })

  const classNames = searchParams.get("view") === "compact" ? COMPACT_CLASSNAMES : LARGE_CLASSNAMES
  const showDetails = searchParams.get("view") === "compact" ? false : true

  if (markets?.length > 0) {
    return (
      <div {...rest} data-component={name}>
        <div className="mb-2 fg--heading font-bold text-xl">{category.description}</div>

        <div className="flex-auto flex flex-row flex-wrap gap-0 justify-start items-start">
          {markets?.map((market) => (
            <MarketOverview className={classNames} showGraphs={showDetails} showActions={showDetails} symbol={market.symbol} key={market.symbol} />
          ))}
        </div>
      </div>
    )
  }
}
