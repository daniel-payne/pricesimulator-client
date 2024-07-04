import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import generateID from "@/utilities/generateID"

export async function controller(db: PriceSimulatorDexie, timestamp: number, source: string, value: number, reference?: string) {
  const newTransaction = {
    id: generateID(),
    timestamp,
    source,
    value,
    reference,
  }

  db.transactions.add(newTransaction)

  return newTransaction
}

export default function addTransaction(timestamp: number, source: string, value: number, reference?: string) {
  return controller(db, timestamp, source, value, reference)
}
