import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadMarkets from "@/data/load/loadMarkets"

import { MARKETS_COUNT } from "@/data/indexDB/constants/MARKETS_COUNT"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const count = await db.markets.count()

  if (count < MARKETS_COUNT) {
    const markets = await loadMarkets()

    await db.markets.bulkPut(markets).catch(Dexie.BulkError, function (e) {
      console.error("loadMarkets Loading Error: " + e.failures.length)
    })
  }
}

export default function currentStatus() {
  return controller(db)
}
