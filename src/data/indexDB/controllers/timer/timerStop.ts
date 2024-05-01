import db from "../../db"

import updateStatus from "../update/updateStatus"

import type { PriceSimulatorDexie } from "../../db"

export async function controller(db: PriceSimulatorDexie) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }
  updateStatus({ isTimerActive: false })
}

export default function timerStop() {
  return controller(db)
}
