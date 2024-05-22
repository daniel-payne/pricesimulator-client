import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import synchronizeAllTrends from "../synchronize/synchronizeAllTrends"

export async function controller(db: PriceSimulatorDexie) {
  const trends = Object.values(db.trendsCache)

  if ((trends?.length ?? 0) === 0) {
    await synchronizeAllTrends()
  }

  return trends
}

export default function getTrends() {
  return controller(db)
}
