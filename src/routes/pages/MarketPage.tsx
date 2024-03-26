import type { HTMLAttributes, PropsWithChildren } from "react"

import db from "@/data/indexDB/db"
import { useLoaderData } from "react-router-dom"

type ComponentProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ params }: any) {
  const market = await db?.marketForSymbol(params.symbol)

  return market
}

export default function MarketPage({ title = "MarketPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useLoaderData()

  return (
    <div {...rest} data-component={title}>
      market
      <hr />
      <pre>{JSON.stringify(market, null, 2)}</pre>
    </div>
  )
}
