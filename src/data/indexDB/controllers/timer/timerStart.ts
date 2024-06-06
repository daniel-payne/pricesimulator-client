import db from "../../db"

import timerNextDay from "./timerNextDay"

import { ScenarioSpeed } from "../../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../../db"
import updateStatus from "../update/updateTimer"

export async function controller(db: PriceSimulatorDexie, speed?: ScenarioSpeed) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }
  if (speed != null) {
    updateStatus({ speed, isTimerActive: true })
  } else {
    updateStatus({ isTimerActive: true })
  }
  timerNextDay()
}

export default function timerStart(speed?: ScenarioSpeed) {
  return controller(db, speed)
}
