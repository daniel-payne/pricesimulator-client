import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import synchronizeAllScenarios from "../synchronize/synchronizeAllScenarios"

export async function controller(db: PriceSimulatorDexie) {
  let scenarios = await db.scenarios.toArray()

  if (scenarios?.length ?? 0 < 0) {
    await synchronizeAllScenarios()

    scenarios = await db.scenarios.toArray()
  }

  return scenarios
}

export default function getScenarios() {
  return controller(db)
}
