import db from "../db"

import { ScenarioSpeed } from "../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../db"
import type { Status } from "../types/Status"

export async function controller(db: PriceSimulatorDexie, newStatus: Status = {}) {
  const id = db.id

  const collection = await db.status.limit(1)
  const currentStatus = await collection.first()

  const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isActive: false }

  if (currentStatus == null) {
    await db.status.add({ ...defaultStatus, ...newStatus, id })
  } else {
    await collection.modify({ ...currentStatus, ...newStatus, id })
  }
}

export default function updateStatus(newStatus: Status = {}) {
  return controller(db, newStatus)
}
