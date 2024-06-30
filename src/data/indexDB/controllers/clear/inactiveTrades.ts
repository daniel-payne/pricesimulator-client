import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  const activeTrades = await db.activeTrades?.where({ symbol }).toArray()

  for (const trade of activeTrades) {
    await db.inactiveTrades?.put(trade)
  }

  const deletedCount = await db.activeTrades?.where({ symbol }).delete()

  return deletedCount
}

export default function inactiveTrades(symbol: string) {
  return controller(db, symbol)
}
