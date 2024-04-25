import MarketCard from "@/components/MarketCard"
import db from "@/data/indexDB/db"
import { useLiveQuery } from "dexie-react-hooks"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsListing({ name = "MarketsListing", ...rest }: PropsWithChildren<ComponentProps>) {
  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row flex-wrap gap-4">
        {markets?.map((market: any) => {
          return <MarketCard key={market.symbol} market={market} />
        })}
      </div>
    </div>
  )
}
