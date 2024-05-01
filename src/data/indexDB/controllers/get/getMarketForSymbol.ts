import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import synchronizeAllMarkets from "../synchronize/synchronizeAllMarkets"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  let market = await db.markets.where({ symbol }).first()

  if (market == null) {
    await synchronizeAllMarkets()

    market = await db.markets.where({ symbol }).first()
  }

  return market
}

export default function getMarketForSymbol(symbol: string) {
  return controller(db, symbol)
}
