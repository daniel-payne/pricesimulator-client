import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Market } from "@/data/indexDB/types/Market"

export default function useMarkets(): Array<string> | undefined {
  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  return markets?.map((market: Market) => market.symbol).sort()
}
