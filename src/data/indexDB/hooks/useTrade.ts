import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Trade } from "@/data/indexDB/types/Trade"

export default function useTrade(id: string | null | undefined): Trade | undefined {
  const trade = useLiveQuery(async () => {
    const active = await db.activeTrades?.where({ id }).first()
    const inactive = await db.inactiveTrades?.where({ id }).first()

    return active ?? inactive
  }, [id])

  return trade
}
