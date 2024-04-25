import db from "../db"

import { ScenarioSpeed } from "../enums/ScenarioSpeed"

import type { PriceSimulatorDexie } from "../db"
import { DEFAULT_START } from "../constants/DEFAULT_START"
import { ONE_DAY } from "../constants/ONE_DAY"
import currentStatus from "./currentStatus"
import updateStatus from "./updateStatus"

export async function controller(db: PriceSimulatorDexie) {
  db.transaction("rw", db.status, async () => {
    const status = await currentStatus()

    if (status?.id === db.id && status.isActive === true) {
      const currentDay = status.currentDay
      const oldDate = new Date(currentDay ?? DEFAULT_START)
      const newDate = new Date(oldDate.getTime() + ONE_DAY)
      const newDay = newDate.toISOString().substring(0, 10)
      updateStatus({ currentDay: newDay })
    }
  })
    .then(async () => {
      const status = await currentStatus()
      const { speed, isActive } = status ?? {}
      if (isActive === true) {
        db.timeout = window.setTimeout(() => {
          controller(db)
        }, speed ?? ScenarioSpeed.slow)
      }
    })
    .catch((err) => {
      console.error(err.stack)
    })
}

export default function nextDay() {
  return controller(db)
}
