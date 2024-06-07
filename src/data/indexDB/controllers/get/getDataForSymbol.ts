import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import loadDataForSymbol from "@/data/server/load/loadDataForSymbol"
import Dexie from "dexie"

const TIMEGAP_CUTOFF = 10

export async function controller(db: PriceSimulatorDexie, symbol: string | undefined) {
  if (symbol == null) {
    return undefined
  }

  const status = await db.statuses?.where({ symbol }).first()

  let timestamps = await db.timestamps?.where({ symbol })?.first()
  let opens = await db.opens?.where({ symbol })?.first()
  let highs = await db.highs?.where({ symbol })?.first()
  let lows = await db.lows?.where({ symbol })?.first()
  let closes = await db.closes?.where({ symbol })?.first()
  let volumes = await db.volumes?.where({ symbol })?.first()

  if (timestamps == null && (status == null || status?.state === "empty")) {
    db.statuses.put({ symbol, state: "retrieving" })

    const data = await loadDataForSymbol(symbol)

    timestamps = { symbol, values: data.timestamps }
    opens = { symbol, values: data.opens }
    highs = { symbol, values: data.highs }
    lows = { symbol, values: data.lows }
    closes = { symbol, values: data.closes }
    volumes = { symbol, values: data.volumes }

    db.statuses.update(symbol, { state: "processing" })

    const timegaps = timestamps.values.map((value: number, index: number) => {
      if (index === 0) {
        return null
      }

      if (timestamps != null) {
        return (value - timestamps.values[index - 1]) / (1000 * 60 * 60 * 24)
      }
    })

    const interdays = timestamps.values.map((_: any, index: number) => {
      if (highs != null && lows != null) {
        return highs.values[index] - lows.values[index]
      }
    })

    let firstActiveTimestamp: number | null = null
    let firstInterdayTimestamp: number | null = null

    let timeGapFound = false

    if (timegaps.length && interdays.length) {
      for (let i = timestamps.values.length - 1; i >= 0; i--) {
        const timegap = timegaps[i] ?? TIMEGAP_CUTOFF + 1
        const interday = interdays[i] ?? 0

        if (timeGapFound === false) {
          if (timegap <= TIMEGAP_CUTOFF) {
            firstActiveTimestamp = timestamps.values[i]
          } else if (i === 0 && timegap == null) {
            firstActiveTimestamp = timestamps.values[i]
          } else {
            timeGapFound = true
          }
        }
        if (timeGapFound === false) {
          if (interday > 0 && firstActiveTimestamp != null) {
            firstInterdayTimestamp = timestamps.values[i]
          }
        }
      }
    }

    db.statuses.update(symbol, { state: "storing" })

    await db.timestamps.put(timestamps).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.timestamps.put(timestamps).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.opens.put(opens).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.highs.put(highs).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.lows.put(lows).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.closes.put(closes).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    await db.volumes.put(volumes).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    db.statuses.put({ symbol, state: "loaded", firstActiveTimestamp, firstInterdayTimestamp })
  }

  return { timestamps, opens, highs, lows, closes, volumes }
}

export default function getDataForSymbol(symbol: string | undefined) {
  return controller(db, symbol)
}
