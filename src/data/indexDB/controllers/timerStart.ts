import db from "../db"

import timerNextDay from "./timerNextDay"

import { ScenarioSpeed } from "../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../db"

import timerUpdate from "./timerUpdate"

export async function controller(db: PriceSimulatorDexie, speed?: ScenarioSpeed, takeControl?: boolean) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }

  const guid = db.guid

  if (speed != null) {
    await timerUpdate({ guid, speed, isTimerActive: true })
  } else {
    await timerUpdate({ guid, isTimerActive: true })
  }

  timerNextDay(takeControl)
}

export default function timerStart(speed?: ScenarioSpeed, takeControl?: boolean) {
  return controller(db, speed, takeControl)
}
