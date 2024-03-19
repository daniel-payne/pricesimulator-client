import Dexie from "dexie"

import db, { SCENARIO_COUNT } from "@/data/indexDB/db"

import loadScenarios from "@/data/load/loadScenarios"

export default async function synchronizeAllScenarios() {
  const count = await db.scenarios.count()

  if (count < SCENARIO_COUNT) {
    const scenarios = await loadScenarios()

    await db.scenarios.bulkPut(scenarios).catch(Dexie.BulkError, function (e) {
      console.error("loadScenarios Loading Error: " + e.failures.length)
    })
  }
}
