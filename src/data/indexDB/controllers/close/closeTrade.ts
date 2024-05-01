import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie, reference: string) {
  await db.trades.update(reference, {
    isTradeActive: false,
  })
}

export default function closeTrade(reference: string) {
  return controller(db, reference)
}
