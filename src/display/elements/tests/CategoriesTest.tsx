import formatTimestamp from "@/utilities/formatTimestamp"

import type { HTMLAttributes, PropsWithChildren } from "react"

import useMarketCategories from "@/data/indexDB/hooks/useMarketCategories"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CategoriesTest({ name = "CategoriesTest", ...rest }: PropsWithChildren<ComponentProps>) {
  const categories = useMarketCategories()

  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <div className="border shadow-xl p-2 bg-base-200">
        <h1>Categories</h1>
        {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}

        {Object.keys(categories ?? {})?.map((key) => {
          const markets = categories?.[key] ?? []

          return (
            <div key={key}>
              <h2>{key}</h2>
              <div className="flex flex-row flex-wrap gap-2 bg-base-100 p-2">
                {markets?.map((market) => {
                  return (
                    <div key={market.id} className="w-64 flex flex-col p-2 border-2 bg-base-200 rounded-lg">
                      <div className="font-bold">{market.symbol}</div>
                      <div>{market.name}</div>
                      <div className="text-xs">{market.description}&nbsp;</div>
                      <div className="text-xs">
                        {market.dataStatus} {market.dataCount} prices
                      </div>
                      <div className="text-xs">
                        {formatTimestamp(market.firstTimestamp)} - {formatTimestamp(market.lastTimestamp)}
                      </div>
                      <div className="text-xs">{market.currentPrice?.bid}</div>
                      <div className="text-xs">{market.currentPrice?.offer}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
