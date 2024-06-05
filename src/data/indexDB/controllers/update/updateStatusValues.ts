import db from "../../db"

import { ScenarioSpeed } from "../../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../../db"
import type { Status } from "../../types/Status"

export async function controller(db: PriceSimulatorDexie, newStatus: Status = {}) {
  const id = db.id

  const collection = await db.status.limit(1)
  const currentStatus = await collection.first()

  const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isTimerActive: false }

  let updatedStatus

  if (currentStatus == null) {
    updatedStatus = { ...defaultStatus, ...newStatus, id }

    await db.status.add(updatedStatus)
  } else {
    updatedStatus = { ...currentStatus, ...newStatus, id }
    await collection.modify(updatedStatus)
  }
}

export default async function updateStatusValues(newStatus: Status = {}) {
  return await controller(db, newStatus)
}
