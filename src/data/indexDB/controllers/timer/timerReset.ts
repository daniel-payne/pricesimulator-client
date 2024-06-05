import db from "../../db"

import updateStatus from "../update/updateStatusValues"

import type { PriceSimulatorDexie } from "../../db"
import timerNextDay from "./timerNextDay"
import { DEFAULT_START } from "../../constants/DEFAULT_START"

export async function controller(db: PriceSimulatorDexie, day: string) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }

  await updateStatus({ isTimerActive: false, currentDay: day })

  await timerNextDay(true)
}

export default function timerReset(day: string = DEFAULT_START) {
  return controller(db, day)
}
