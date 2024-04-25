import db from "../db"

import { ScenarioSpeed } from "../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../db"

export async function controller(db: PriceSimulatorDexie) {
  const id = db.id
  let collection = await db.status.limit(1)
  let status = await collection.first()

  const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isActive: false }

  if (status == null) {
    await db.status.add({ ...defaultStatus, id })
    collection = await db.status.limit(1)
    status = await collection.first()
  }
  return status
}

export default function currentStatus() {
  return controller(db)
}
