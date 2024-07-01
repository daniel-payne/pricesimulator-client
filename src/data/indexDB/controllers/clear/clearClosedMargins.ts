import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import { TradeStatus } from "../../enums/TradeStatus"

export async function controller(db: PriceSimulatorDexie, symbol: string) {
  let deletedCount = 0

  const margins = await db.margins?.where({ symbol }).toArray()

  for (const margin of margins) {
    const trade = await db.trades?.get(margin.tradeID)

    if (trade?.status === TradeStatus.CLOSED) {
      await db.margins?.delete(margin.id)
      deletedCount++
    }
  }

  return deletedCount
}

export default function clearClosedMargins(symbol: string) {
  return controller(db, symbol)
}
