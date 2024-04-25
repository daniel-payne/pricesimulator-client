import db from "../db"

import type { PriceSimulatorDexie } from "../db"

export async function controller(db: PriceSimulatorDexie) {
  return db ? null : db
}

export default function currentStatus() {
  return controller(db)
}
