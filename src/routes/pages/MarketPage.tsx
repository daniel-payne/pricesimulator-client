import type { HTMLAttributes, PropsWithChildren } from "react"

// import db from "@/data/indexDB/db"
import { useLoaderData } from "react-router-dom"

import MarketQuote from "@/controls/market/MarketQuote"
import MarketTrend from "@/controls/market/MarketTrend"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ params }: any) {
  return { symbol: params.symbol }
}

export default function MarketPage({ name = "MarketPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const { symbol } = useLoaderData() as any

  return (
    <div {...rest} data-component={name}>
      <div className="w-full h-full flex flex-col gap-1">
        <MarketQuote symbol={symbol} />
        <MarketTrend className="flex-auto" symbol={symbol} />
      </div>
    </div>
  )
}
