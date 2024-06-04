import synchronizeAllMarkets from "@/data/indexDB/controllers/synchronize/synchronizeAllMarkets"
// import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import useMarketCategories from "@/data/indexDB/hooks/useMarketCategories"
import useStatus from "@/data/indexDB/hooks/useStatus"
import MarketsCategory from "@/display/components/MarketsCategory"

import type { HTMLAttributes, PropsWithChildren } from "react"
import { useSearchParams } from "react-router-dom"

export async function loader() {
  synchronizeAllMarkets()

  // timerStart(ScenarioSpeed.slow)

  return null
}

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsPage({ name = "MarketsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const [searchParams] = useSearchParams()

  const showFavorites = searchParams.get("view") === "favorites"

  const status = useStatus()
  const categories = useMarketCategories()

  return (
    <div {...rest} data-component={name}>
      <div className="p-2">
        <div className="flex-auto flex flex-col gap-2 justify-start">
          {showFavorites ? (
            <div>favorites</div>
          ) : (
            <>
              {categories?.map((category) => (
                <MarketsCategory status={status} category={category} key={category.name} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
