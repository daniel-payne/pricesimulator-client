import compareObjectsBy from "@/utilities/compareObjectsBy"
import { useLiveQuery } from "dexie-react-hooks"
import db from "../db"
import { TradeStatus } from "../enums/TradeStatus"

export default function useActiveTradeFor(id: string | null | undefined = "MISSING") {
  const data = useLiveQuery(async () => {
    return await db.trades?.where({ id, status: TradeStatus.Open }).first()
  }, [id])

  return data
}