import TrendCard from "@/display/components/TrendCard"
import db from "@/data/indexDB/db"
import { useLiveQuery } from "dexie-react-hooks"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TrendsListing({ name = "TrendsListing", ...rest }: PropsWithChildren<ComponentProps>) {
  const trends = useLiveQuery(async () => {
    return await db.trends?.toArray()
  })

  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row flex-wrap gap-4">
        {trends?.map((trend) => {
          const currentIndex = db.indexCache[trend.symbol]
          return <TrendCard key={trend.symbol} trend={trend} currentIndex={currentIndex} />
        })}
      </div>
    </div>
  )
}
