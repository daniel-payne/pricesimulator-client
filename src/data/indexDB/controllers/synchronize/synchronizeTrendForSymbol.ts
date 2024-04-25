import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadTrend from "@/data/load/loadTrend"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  const market = await db.markets.where({ symbol }).first()

  const hasNoData = market && (market.dataCount ?? 0) === 0
  const isNotLoading = market && market.dataStatus == null

  if (hasNoData && isNotLoading) {
    await db.markets.update(symbol, { dataStatus: "LOADING" })

    const trends = await loadTrend(symbol)

    const firstTimestamp = trends.timestamps[0]
    const secondTimestamp = trends.timestamps[1]
    const lastTimestamp = trends.timestamps[trends.timestamps.length - 1]

    trends.symbol = symbol

    await db.trends.put(trends).catch(Dexie.BulkError, function (e) {
      console.error("loadMarkets Loading Error: " + e.failures.length)
    })

    await db.markets.update(symbol, { dataStatus: undefined, dataCount: trends.timestamps.length, firstTimestamp, secondTimestamp, lastTimestamp })
  }
}

export default function synchronizeTrendForSymbol(symbol: string) {
  return controller(db, symbol)
}
