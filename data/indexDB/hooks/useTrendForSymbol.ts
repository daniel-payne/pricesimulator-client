import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

export default function useTrendsForSymbol(symbol?: string) {
  const result = useLiveQuery(() => db.trends.where({ symbol }).first())

  if (result == null && symbol != null) {
    db.synchronizeTrendForSymbol(symbol)
  }

  return result
}
