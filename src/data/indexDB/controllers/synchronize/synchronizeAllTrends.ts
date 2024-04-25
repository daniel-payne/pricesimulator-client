import db from "@/data/indexDB/db"

import synchronizeTrendForSymbol from "@/data/indexDB/controllers/synchronize/synchronizeTrendForSymbol"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const markets = await db.markets.toArray()

  const synchronizeTrends = markets.map((market) => {
    return synchronizeTrendForSymbol(market.symbol)
  })

  await Promise.all(synchronizeTrends)
}

export default function currentStatus() {
  return controller(db)
}
