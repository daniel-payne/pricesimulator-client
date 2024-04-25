import db from "../../db"

import updateStatus from "../status/updateStatus"

import type { PriceSimulatorDexie } from "../../db"

export async function controller(db: PriceSimulatorDexie) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }
  updateStatus({ isActive: false })
}

export default function stopTimer() {
  return controller(db)
}
