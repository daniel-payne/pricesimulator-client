import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadTrend from "@/data/load/loadTrend"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import calculateNewStatus from "../update/updateCurrentInformation"
import updateStatus from "../update/updateStatusValues"

// import type { Trend } from "../../types/Trend"

const DAYS = 1000 * 60 * 60 * 24

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  let trend = db.trendsCache[symbol] as any

  if (trend == null) {
    trend = await loadTrend(symbol)

    trend.symbol = symbol

    trend.timegaps = trend.timestamps.map((timestamp: number, index: number) => {
      if (index === 0) {
        return null
      }

      return (timestamp - trend.timestamps[index - 1]) / DAYS
    })

    trend.interdays = trend.timestamps.map((_: any, index: number) => {
      return trend.highs[index] - trend.lows[index]
    })

    for (let i = trend.timestamps.length - 1; i > 0; i--) {
      if (trend.timegaps[i] <= 5) {
        trend.firstActiveTimestamp = trend.timestamps[i]
      } else if (i === 0) {
        trend.firstActiveTimestamp = trend.timestamps[i]
      }
      if (trend.interdays[i] > 0 && trend.firstActiveTimestamp != null) {
        trend.firstInterdayTimestamp = trend.timestamps[i]
      }
    }

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
