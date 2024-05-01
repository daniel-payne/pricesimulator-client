import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadMarkets from "@/data/load/loadMarkets"

import { MARKETS_COUNT } from "@/data/indexDB/constants/MARKETS_COUNT"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const markets = await db.markets.toArray()

  const count = markets.length

  if (count < MARKETS_COUNT) {
    const newMarkets = await loadMarkets()

    await db.markets.bulkPut(newMarkets).catch(Dexie.BulkError, function (e) {
      console.error("loadMarkets Loading Error: " + e.failures.length)
    })
  }

  markets?.forEach((market) => {
    db.marketsCache[market.symbol] = market
  })
}

export default function currentStatus() {
  return controller(db)
}
