import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Market } from "@/data/indexDB/types/Market"

export default function useMarketCategories(): Record<string, Array<Market>> | undefined {
  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  const categories: Record<string, Array<Market>> = {}

  for (const market of markets || []) {
    const category = market.category

    if (!categories[category]) {
      categories[category] = []
    }

    categories[category].push(market)
  }

  return categories
}
