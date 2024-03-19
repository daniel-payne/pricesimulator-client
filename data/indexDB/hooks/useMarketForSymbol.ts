import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

export default function useMarketForSymbol(symbol: string = "MISSING") {
  const result = useLiveQuery(() => db.markets.where({ symbol }).first())

  if (result == null) {
    db.synchronizeAllMarkets()
  }

  return result
}
