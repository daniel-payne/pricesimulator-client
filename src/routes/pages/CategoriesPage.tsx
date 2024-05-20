import synchronizeAllMarkets from "@/data/indexDB/controllers/synchronize/synchronizeAllMarkets"

import useMarketCategories from "@/data/indexDB/hooks/useMarketCategories"
import useStatus from "@/data/indexDB/hooks/useStatus"
import CategoryGroup from "@/display/components/CategoryGroup"

import type { HTMLAttributes, PropsWithChildren } from "react"

export async function loader() {
  synchronizeAllMarkets()

  return null
}

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CategoriesPage({ name = "CategoriesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()
  const categories = useMarketCategories()

  return (
    <div {...rest} data-component={name}>
      <div className="p-2">
        <div className="flex-auto flex flex-col gap-2 justify-start">
          {categories?.map((category) => (
            <CategoryGroup status={status} category={category} key={category.name} />
          ))}
        </div>
      </div>
    </div>
  )
}
