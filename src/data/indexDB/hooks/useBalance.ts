import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { TradeStatus } from "../enums/TradeStatus"

export default function useBalance(): number | undefined {
  const balance = useLiveQuery(async () => {
    const transactions = await db.transactions?.toArray()
    const margins = await db.margins?.where({ status: TradeStatus.OPEN }).toArray()

    const transactionBalance = transactions.reduce((acc, transaction) => {
      return acc + transaction.value
    }, 0)

    const marginBalance = margins.reduce((acc, margin) => {
      return acc + margin.currentProfit
    }, 0)

    return (transactionBalance ?? 0) + (marginBalance ?? 0)
  })

  return balance
}
