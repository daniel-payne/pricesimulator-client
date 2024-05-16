import synchronizeAllMarkets from "@/data/indexDB/controllers/synchronize/synchronizeAllMarkets"

import useMarketCategories from "@/data/indexDB/hooks/useMarketCategories"

import type { HTMLAttributes, PropsWithChildren } from "react"

export async function loader() {
  synchronizeAllMarkets()

  return null
}

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsPage({ name = "MarketsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const categories = useMarketCategories()

  return (
    <div {...rest} data-component={name}>
      <div className="p-6">.{JSON.stringify(categories, null, 2)}.</div>
    </div>
  )
}
