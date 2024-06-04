import MarketOverview from "../elements/MarketOverview"

import { Suspense, type HTMLAttributes, type PropsWithChildren } from "react"

import type { Category } from "@/data/indexDB/types/Category"
import { Status } from "@/data/indexDB/types/Status"
import { useQueryState } from "@keldan-systems/state-mutex"

type ComponentProps = {
  status?: Status
  category: Category

  name?: string
} & HTMLAttributes<HTMLDivElement>

const LARGE_CLASSNAMES = "p-2 w-[100%] sm:w-[50%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-64"
const COMPACT_CLASSNAMES = "p-2 w-[100%] sm:w-[33.3%] md:w-[25%] lg:w-[20%] xl:w-[12.5%] h-24"

export default function MarketsCategory({ status, category, name = "MarketsCategory", ...rest }: PropsWithChildren<ComponentProps>) {
  const [view] = useQueryState("view")

  const markets = category.markets.filter((market) => {
    const currentIndexForSymbol = status?.currentIndexForSymbol ?? {}
    const currentIndex = currentIndexForSymbol[market.symbol] ?? ({} as any)

    return currentIndex.isMarketActive === true
  })

  const classNames = view === "compact" ? COMPACT_CLASSNAMES : LARGE_CLASSNAMES
  const showDetails = view === "compact" ? false : true

  if (markets?.length === 0) {
    return null
  }

  return (
    <div {...rest} data-component={name}>
      <div className="mb-2 fg--heading font-bold text-xl">{category.description}</div>

      <div className="flex-auto flex flex-row flex-wrap gap-0 justify-start items-start">
        {markets?.map((market) => (
          <Suspense fallback={<div>Loading...</div>} key={market.symbol}>
            <MarketOverview className={classNames} showGraphs={showDetails} showActions={showDetails} symbol={market.symbol} key={market.symbol} />
          </Suspense>
        ))}
      </div>
    </div>
  )
}