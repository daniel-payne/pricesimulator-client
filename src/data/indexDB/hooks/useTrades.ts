import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Trade } from "@/data/indexDB/types/Trade"

export enum TradeStatus {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export default function useTrades(status: TradeStatus = TradeStatus.OPEN, newestFirst = true, limit: number | undefined = undefined): Array<Trade> | undefined {
  const market = useLiveQuery(async () => {
    const data = await db.trades?.where({ status })

    let array = await data.sortBy("exitTimestamp")

    if (newestFirst) {
      array = await array.reverse()
    }

    if (limit != null) {
      array = array.slice(0, limit ?? 999999)
    }

    return array
  }, [newestFirst, limit])

  return market
}
