import db from "../../db"

import nextDay from "./nextDay"

import { ScenarioSpeed } from "../../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../../db"
import updateStatus from "../status/updateStatus"

export async function controller(db: PriceSimulatorDexie, speed?: ScenarioSpeed) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }
  if (speed != null) {
    updateStatus({ speed, isActive: true })
  } else {
    updateStatus({ isActive: true })
  }
  nextDay()
}

export default function startTimer(speed?: ScenarioSpeed) {
  return controller(db, speed)
}
