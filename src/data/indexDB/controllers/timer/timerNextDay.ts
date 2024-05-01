import db from "@/data/indexDB/db"

import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"

import { DEFAULT_START } from "@/data/indexDB/constants/DEFAULT_START"
import { ONE_DAY } from "@/data/indexDB/constants/ONE_DAY"

import updateStatus from "@/data/indexDB/controllers/update/updateStatus"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
// import updateStatusForDay from "../update/updateStatusForCurrentDay"
import getStatus from "../get/getStatus"
import calculateNewStatus from "../../calculate/calculateNewStatus"

export async function controller(db: PriceSimulatorDexie, takeControl: boolean) {
  db.transaction("rw", ["status", "trends", "markets"], async () => {
    const status = await getStatus()

    const currentDay = status?.currentDay

    const isOwner = takeControl === true ? true : status?.id === db.id
    const isTimerActive = takeControl === true ? true : status?.isTimerActive === true

    if (isOwner && isTimerActive && currentDay != null) {
      const oldDate = new Date(currentDay ?? DEFAULT_START)
      const newDate = new Date(oldDate.getTime() + ONE_DAY)

      const newDay = newDate.toISOString().substring(0, 10)

      if (takeControl === true) {
        await updateStatus({ id: db.id, currentDay: newDay, isTimerActive: false })
      } else {
        await updateStatus({ currentDay: newDay })
      }

      const newStatus = await calculateNewStatus()

      updateStatus(newStatus)
    }
  })
    .then(async () => {
      const status = await db.status.limit(1).first()

      const { speed, isTimerActive } = status ?? {}

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
