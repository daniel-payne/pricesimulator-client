import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import timerReset from "./timerReset"

import transactionsAdd from "./transactionsAdd"
import { TransactionSource } from "../enums/TransactionSource"

import favoritesClear from "@/data/localStorage/controllers/favoritesClear"
import { setState, StoragePersistence } from "@keldan-systems/state-mutex"

export async function controller(db: PriceSimulatorDexie) {
  await db.trades.clear()
  await db.transactions.clear()

  await timerReset()

  await transactionsAdd(5000, TransactionSource.User, undefined, "Fresh start deposit")

  await favoritesClear()

  setState("CAN-PAUSE", true, StoragePersistence.local)

  return
}

export default function clearUserData() {
  return controller(db)
}
