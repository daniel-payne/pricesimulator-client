import useStatuses from "@/data/indexDB/hooks/useStatuses"
import MarketOverview from "../elements/MarketOverview"

import type { Category } from "@/data/indexDB/types/Category"

import { useDataState } from "@keldan-systems/state-mutex"

import type { HTMLAttributes, PropsWithChildren } from "react"

import useTimer from "@/data/indexDB/hooks/useTimer"
import formatTimestamp from "@/utilities/formatTimestamp"

type ComponentProps = {
  category: Category

  name?: string
} & HTMLAttributes<HTMLDivElement>

const LARGE_CLASSNAMES = "p-2 w-[100%] sm:w-[50%] md:w-[33.3%] lg:w-[25%] xl:w-[20%] h-64"
const COMPACT_CLASSNAMES = "p-2 w-[100%] sm:w-[33.3%] md:w-[25%] lg:w-[20%] xl:w-[12.5%] h-24"

export default function MarketsCategory({ category, name = "MarketsCategory", ...rest }: PropsWithChildren<ComponentProps>) {
  const view = useDataState<string>("view")
  const timer = useTimer()

  const statuses = useStatuses()

  const currentTimestamp = timer?.currentTimestamp

  const markets = category.markets.filter((market) => {
    const status = statuses?.find((status) => status.symbol === market.symbol)

    const firstActiveTimestamp = status?.firstActiveTimestamp

    const isActive = (firstActiveTimestamp ?? 1) <= (currentTimestamp ?? 0)

    return isActive
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
          <MarketOverview className={classNames} showGraphs={showDetails} showActions={showDetails} symbol={market.symbol} key={market.symbol} />
        ))}
      </div>
    </div>
  )
}
