import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Category } from "@/data/indexDB/types/Category"
import pluralWord from "@/utilities/pluralWord"
import capitalizedWord from "@/utilities/capitalizedWord"

export default function useMarketCategories(): Array<Category> | undefined {
  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  const categories: Array<Category> = []

  for (const market of markets || []) {
    // const category = { name: market.category, markets: [] }
    const name = market.category

    let category = categories.find((category) => category.name === name)

    if (!category) {
      const description = capitalizedWord(pluralWord(name))

      category = { name: market.category, description, markets: [] }

      categories.push(category)
    }

    category.markets.push(market)
  }

  for (const category of categories) {
    category.markets.sort((a, b) => {
      if (a.category === "bond") {
        const first = Number.parseInt(a.name)
        const second = Number.parseInt(b.name)

        if (first < second) return -1
        else if (first > second) return 1
        else return 0
      }

      return a.name.localeCompare(b.name)
    })
  }

  return categories
}
