import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Trade } from "@/data/indexDB/types/Trade"

export default function useActiveTradeForSymbol(symbol: string | undefined | null = "NO-MATCH"): Trade | undefined {
  const market = useLiveQuery(async () => {
    const data = await db.activeTrades?.where({ symbol }).first()

    return data
  }, [symbol])

  return market
}
