import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Trade } from "@/data/indexDB/types/Trade"
import { TradeStatus } from "./useTrades"

export default function useActiveTradeForSymbol(symbol: string | undefined | null = "NO-MATCH"): Trade | undefined {
  const market = useLiveQuery(async () => {
    const data = await db.trades?.where({ symbol, status: TradeStatus.OPEN }).first()

    return data
  }, [symbol])

  return market
}
