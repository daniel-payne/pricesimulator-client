import db from "../../db"

import updateStatus from "../update/updateStatus"

import type { PriceSimulatorDexie } from "../../db"
import timerNextDay from "./timerNextDay"

export async function controller(db: PriceSimulatorDexie, day: string) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }

  await updateStatus({ isTimerActive: false, currentDay: day })

  await timerNextDay(true)
}

export default function timerReset(day: string) {
  return controller(db, day)
}
