// import PricesCard from "@/display/components/xPricesCard"
// import db from "@/data/indexDB/db"
// import { useLiveQuery } from "dexie-react-hooks"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function PricesListing({ name = "PricesListing", ...rest }: PropsWithChildren<ComponentProps>) {
  // const prices = useLiveQuery(async () => {
  //   return await db.prices?.toArray()
  // })

  return (
    <div {...rest} data-controller={name}>
      {/* <div className="flex flex-row flex-wrap gap-4">
        {prices?.length}
        {prices?.map((price) => {
          return <PricesCard key={price.symbol} price={price} />
        })}
      </div> */}
    </div>
  )
}
