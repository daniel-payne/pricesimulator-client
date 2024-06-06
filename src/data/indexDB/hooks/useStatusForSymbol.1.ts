import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Status } from "@/data/indexDB/types/Status"

export default function useMarketForSymbol(symbol = "NO-MATCH"): Status | undefined {
  const status = useLiveQuery(async () => {
    return await db.statuses?.where({ symbol }).first()
  }, [symbol])

  return status
}
