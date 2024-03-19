import Dexie from "dexie"

import db, { MARKETS_COUNT } from "@/data/indexDB/db"

import loadMarkets from "@/data/load/loadMarkets"

export default async function synchronizeAllMarkets() {
  const count = await db.markets.count()

  if (count < MARKETS_COUNT) {
    const markets = await loadMarkets()

    await db.markets.bulkPut(markets).catch(Dexie.BulkError, function (e) {
      console.error("loadMarkets Loading Error: " + e.failures.length)
    })
  }
}
