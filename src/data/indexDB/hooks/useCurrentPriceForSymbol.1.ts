import type { Status } from "../types/Status"
import { useLiveQuery } from "dexie-react-hooks"
import db from "../db"

export default function useStatusForSymbol(symbol: string | undefined | null): Status | undefined {
  const data = useLiveQuery(async () => {
    const result = await db.statuses?.where({ symbol }).first()

    return result
  }, [symbol])

  return data
}
