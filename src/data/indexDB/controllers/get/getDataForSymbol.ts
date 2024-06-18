import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import loadDataForSymbol from "@/data/server/load/loadDataForSymbol"
import { setState } from "@keldan-systems/state-mutex"
import Dexie from "dexie"

const TIMEGAP_CUTOFF = 10

export async function controller(db: PriceSimulatorDexie, symbol: string | undefined | null) {
  if (symbol == null) {
    return undefined
  }

  if (db.dataCache[symbol] != null) {
    return db.dataCache[symbol]
  }

  setState(symbol + "-STATE", { message: "Retrieving price data" })

  let data = await db.data?.where({ symbol })?.first()

  setState(symbol + "-STATE", { message: "Finished checking for local data" })

  if (data != null) {
    setState(symbol + "-STATE", { message: "Using Data straight from local data" })

    db.dataCache[symbol] = data

    return db.dataCache[symbol]
  } else {
    setState(symbol + "-STATE", { state: "retrieving", message: "Retrieving data from server" })

    data = await loadDataForSymbol(symbol)

    const timestamps = data?.timestamps
    const highs = data?.highs
    const lows = data?.lows
    const opens = data?.opens
    const closes = data?.closes

    if (timestamps == null || highs == null || lows == null || opens == null || closes == null) {
      setState(symbol + "-STATE", { state: "error", message: "Error loading data" })

      return undefined
    }

    setState(symbol + "-STATE", { state: "processing", message: "Processing data" })

    const timegaps = data?.timestamps?.map((value: number, index: number) => {
      if (index === 0) {
        return null
      }

      return (value - timestamps[index - 1]) / (1000 * 60 * 60 * 24)
    })

    const interdays = timestamps.map((_: any, index: number) => {
      if (highs != null && lows != null) {
        return highs[index] - lows[index]
      }
    })

    let firstActiveTimestamp: number | null = null
    let firstInterdayTimestamp: number | null = null

    let timeGapFound = false

    if (timegaps?.length && interdays.length) {
      for (let i = timestamps.length - 1; i >= 0; i--) {
        const timegap = timegaps[i] ?? TIMEGAP_CUTOFF + 1
        const interday = interdays[i] ?? 0

        if (timeGapFound === false) {
          if (timegap <= TIMEGAP_CUTOFF) {
            firstActiveTimestamp = timestamps[i]
          } else if (i === 0 && timegap == null) {
            firstActiveTimestamp = timestamps[i]
          } else {
            timeGapFound = true
          }
        }
        if (timeGapFound === false) {
          if (interday > 0 && firstActiveTimestamp != null) {
            firstInterdayTimestamp = timestamps[i]
          }
        }
      }

      if (data != null) {
        data.count = timestamps.length
        data.firstActiveTimestamp = firstActiveTimestamp
        data.firstInterdayTimestamp = firstInterdayTimestamp

        setState(symbol + "-STATE", { state: "storing", message: "Storing data" })

        await db.data.put(data).catch(Dexie.BulkError, function (e) {
          console.error("loadScenarios Loading Error: " + e.failures.length)
        })

        setState(symbol + "-STATE", { state: "loaded", message: "Local data stored" })
      } else {
        setState(symbol + "-STATE", { state: "error", message: "Local data error" })
      }
    } else {
      setState(symbol + "-STATE", { message: "Using Data from local data" })
    }

    db.dataCache[symbol] = data

    return db.dataCache[symbol]
  }
}

export default function getDataForSymbol(symbol: string | undefined | null) {
  return controller(db, symbol)
}
