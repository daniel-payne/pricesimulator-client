import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  const deletedCount = await db.activeTrades?.where({ symbol }).delete()

  return deletedCount
}

export default function clearActiveTrades(symbol: string) {
  return controller(db, symbol)
}
