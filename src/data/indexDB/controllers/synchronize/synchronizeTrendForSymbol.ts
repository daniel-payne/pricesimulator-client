import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadTrend from "@/data/load/loadTrend"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import calculateNewStatus from "../../calculate/calculateNewStatus"
import updateStatus from "../update/updateStatus"
import getStatus from "../get/getStatus"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  const status = await getStatus()

  const hasNoData = (status.trendCountForSymbol?.[symbol] ?? 0) === 0

  if (hasNoData) {
    const trend = await loadTrend(symbol)

    trend.symbol = symbol

    await db.trends.put(trend).catch(Dexie.BulkError, function (e) {
      console.error("loadMarkets Loading Error: " + e.failures.length)
    })

    db.trendsCache[symbol] = trend

    const newStatus = await calculateNewStatus()

    updateStatus(newStatus)
  }
}

export default function synchronizeTrendForSymbol(symbol: string) {
  return controller(db, symbol)
}
