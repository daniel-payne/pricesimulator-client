import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import { ScenarioSpeed } from "../../enums/ScenarioSpeed"

export async function controller(db: PriceSimulatorDexie) {
  const id = db.id

  let status = await db.status.limit(1).first()

  if (status == null) {
    const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isTimerActive: false }

    status = { ...defaultStatus, id }

    await db.status.add(status)
  }

  return status
}

export default function getStatus() {
  return controller(db)
}
