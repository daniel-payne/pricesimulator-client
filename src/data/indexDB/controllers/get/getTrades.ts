import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const trades = db.trades.toArray()

  return trades
}

export default function getTrades() {
  return controller(db)
}
