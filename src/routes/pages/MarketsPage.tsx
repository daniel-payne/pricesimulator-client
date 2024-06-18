// import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import useMarketCategories from "@/data/indexDB/hooks/useMarketCategories"

import MarketsCategory from "@/display/components/MarketsCategory"
import { useDataState } from "@keldan-systems/state-mutex"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsPage({ name = "MarketsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const applicationState: any = useDataState("APPLICATION-STATUS")

  const view = useDataState<string>("view")

  const showFavorites = view === "favorites"

  const categories = useMarketCategories()

  if (applicationState?.dataLoaded !== true) {
    return <div className="p-2 text-xl font-bold">{applicationState?.message}</div>
  }

  return (
    <div {...rest} data-component={name}>
      <div className="p-2">
        <div className="flex-auto flex flex-col gap-2 justify-start">
          {showFavorites ? (
            <div>favorites</div>
          ) : (
            <>
              {categories?.map((category) => (
                <MarketsCategory category={category} key={category.name} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
