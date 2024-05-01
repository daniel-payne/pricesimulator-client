import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import synchronizeAllMarkets from "../synchronize/synchronizeAllMarkets"

export async function controller(db: PriceSimulatorDexie) {
  let markets = await db.markets.toArray()

  if (markets?.length ?? 0 < 0) {
    await synchronizeAllMarkets()

    markets = await db.markets.toArray()
  }

  return markets
}

export default function getMarkets() {
  return controller(db)
}
