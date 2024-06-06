import db from "@/data/indexDB/db"

import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import { DEFAULT_START } from "@/data/indexDB/constants/DEFAULT_START"
import { ONE_DAY } from "@/data/indexDB/constants/ONE_DAY"

import updateTimer from "@/data/indexDB/controllers/update/updateTimer"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
// import updateStatusForDay from "../update/updateStatusForCurrentDay"
import getTimer from "../get/getTimer"
// import calculateNewStatus from "../update/updateCurrentInformation"

export async function controller(db: PriceSimulatorDexie, takeControl: boolean) {
  db.transaction("rw", ["timer", "statuses", "markets"], async () => {
    const status = await getTimer()

    const currentDay = status?.currentDay

    const isOwner = takeControl === true ? true : status?.id === db.id
    const isTimerActive = takeControl === true ? true : status?.isTimerActive === true

    if (isOwner && isTimerActive && currentDay != null) {
      const oldDate = new Date(currentDay ?? DEFAULT_START)
      const newDate = new Date(oldDate.getTime() + ONE_DAY)

      const newDay = newDate.toISOString().substring(0, 10)
      const newTimestamp = newDate.getTime()

      if (takeControl === true) {
        await updateTimer({ id: db.id, currentDay: newDay, currentTimestamp: newTimestamp, isTimerActive: false })
      } else {
        await updateTimer({ currentDay: newDay, currentTimestamp: newTimestamp })
      }

      // const newStatus = await calculateNewStatus()

      // updateStatus(newStatus)
    }
  })
    .then(async () => {
      const timer = await db.timer.limit(1).first()

      const { speed, isTimerActive } = timer ?? {}

      if (isTimerActive === true) {
        db.timeout = window.setTimeout(() => {
          controller(db, takeControl)
        }, speed ?? ScenarioSpeed.slow)
      }
    })
    .catch((err) => {
      console.error(err.stack)
    })
}

export default function timerNextDay(takeControl = false) {
  return controller(db, takeControl)
}
