import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import synchronizeTrendForSymbol from "../synchronize/synchronizeTrendForSymbol"
import type { Trend } from "../../types/Trend"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  let trends = db.trendsCache[symbol]

  if (trends == null) {
    trends = (await db.trends.get(symbol)) as Trend

    db.trendsCache[symbol] = trends
  }

  if (trends == null) {
    await synchronizeTrendForSymbol(symbol)

    trends = (await db.trends.get(symbol)) as Trend

    db.trendsCache[symbol] = trends
  }

  return trends
}

export default function getTrendForSymbol(symbol: string) {
  return controller(db, symbol)
}
