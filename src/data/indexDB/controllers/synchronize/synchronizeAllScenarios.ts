import Dexie from "dexie"

import db from "@/data/indexDB/db"

import loadScenarios from "@/data/load/loadScenarios"

import { SCENARIO_COUNT } from "@/data/indexDB/constants/SCENARIO_COUNT"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

export async function controller(db: PriceSimulatorDexie) {
  const count = await db.scenarios.count()

  if (count < SCENARIO_COUNT) {
    const scenarios = await loadScenarios()

    await db.scenarios.bulkPut(scenarios).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })

    scenarios?.forEach((scenario: any) => {
      db.scenariosCache[scenario.code] = scenario
    })
  }
}

export default function currentStatus() {
  return controller(db)
}
