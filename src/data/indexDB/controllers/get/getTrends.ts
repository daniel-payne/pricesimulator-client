import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const trends = Object.values(db.trendsCache)

  return trends
}

export default function getTrends() {
  return controller(db)
}
