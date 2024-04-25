import db from "@/data/indexDB/db"

import synchronizeTrendForSymbol from "@/data/indexDB/controllers/synchronize/synchronizeTrendForSymbol"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie, symbols: Array<string>) {
  const synchronizeTrends = symbols.map((symbol) => {
    return synchronizeTrendForSymbol(symbol)
  })

  await Promise.all(synchronizeTrends)
}

export default function synchronizeTrendForSymbols(symbols: Array<string>) {
  return controller(db, symbols)
}
