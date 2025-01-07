import db from "../db"

import timerUpdate from "./timerUpdate"

import type { PriceSimulatorDexie } from "../db"
import { getState } from "@keldan-systems/state-mutex"
 
 
export async function controller(db: PriceSimulatorDexie) {
  const canPause = getState("CAN-PAUSE") ?? true

  const canNotPause = !Boolean(canPause)

  if (canNotPause){
    return
  }

  if (db.timeout != null) {
    window.clearTimeout(db.timeout)
  }

  timerUpdate({ isTimerActive: false })
}

export default function timerPause() {
  return controller(db)
}
