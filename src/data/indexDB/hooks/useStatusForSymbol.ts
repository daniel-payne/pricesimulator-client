import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Status } from "@/data/indexDB/types/Status"

export default function useStatusForSymbol(symbol: string | undefined): Status | undefined {
  const status = useLiveQuery(async () => {
    return await db.statuses?.where({ symbol }).first()
  })

  if (symbol == null) {
    return undefined
  }

  if (status == null) {
    return { symbol, state: "empty" }
  }

  return status
}
