import db from "../db"

import type { PriceSimulatorDexie } from "../db"
import updateStatus from "./updateStatus"

export async function controller(db: PriceSimulatorDexie) {
  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }
  updateStatus({ isActive: false })
}

export default function stopTimer() {
  return controller(db)
}
