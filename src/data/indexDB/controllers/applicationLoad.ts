import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import { controller as currenciesLoadAll } from "./currenciesLoadAll"
import { controller as marketsLoadAll } from "./marketsLoadAll"
import { controller as scenariosLoadAll } from "./scenariosLoadAll"
import { controller as ohlcLoadFor } from "./ohlcLoadFor"
import { controller as ratesLoadFor } from "./ratesLoadFor"
import { controller as transactionsAdd } from "./transactionsAdd"
import { TransactionSource } from "../enums/TransactionSource"
import { controller as timerUpdate } from "./timerUpdate"
import { ScenarioSpeed } from "../enums/ScenarioSpeed"
import { DEFAULT_START } from "../constants/DEFAULT_START"

export async function controller(db: PriceSimulatorDexie) {
  const defaultTimer = {
    guid: db.guid,
    speed: ScenarioSpeed.Slow,
    currentIndex: DEFAULT_START,
    isTimerActive: false,
  }

  await timerUpdate(db, defaultTimer)

  await currenciesLoadAll(db)
  await marketsLoadAll(db)
  await scenariosLoadAll(db)

  await ohlcLoadFor(db, "LC.F")
  await ratesLoadFor(db, "USD")

  await transactionsAdd(db, 5000, TransactionSource.User, undefined, "Initial deposit")

  return
}

export default function applicationLoad() {
  return controller(db)
}
