import Dexie from "dexie"

import db, { MARKETS_COUNT } from "@/data/indexDB/db"

export default async function scenariosForApp() {
  let scenarios = db.scenarioCache

  if (Object.keys(scenarios).length === 0) {
    scenarios = await (
      await db.scenarios.toArray()
    ).reduce((acc: any, scenario) => {
      acc[scenario.id] = scenario
      return acc
    }, {})

    db.scenarioCache = scenarios
  }

  if (Object.keys(scenarios).length === 0) {
    await db.synchronizeAllScenarios()

    scenarios = await (
      await db.scenarios.toArray()
    ).reduce((acc: any, scenario) => {
      acc[scenario.id] = scenario
      return acc
    }, {})

    db.scenarioCache = scenarios
  }

  return Object.keys(db.scenarioCache).map((key) => db.scenarioCache[key])
}
