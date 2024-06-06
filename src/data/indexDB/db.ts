import Dexie, { Table } from "dexie"

import type { Timer } from "@/data/indexDB/types/Timer"
import type { Scenario } from "@/data/indexDB/types/Scenario"
import type { Market } from "@/data/indexDB/types/Market"
import type { Status } from "@/data/indexDB/types/Status"
import type { Data } from "@/data/indexDB/types/Data"
import type { Index } from "@/data/indexDB/types/Index"
import type { Price } from "@/data/indexDB/types/Price"

import generateID from "@/utilities/generateID"

export class PriceSimulatorDexie extends Dexie {
  id: string
  timeout: number | null = null

  timer!: Table<Timer>

  scenarios!: Table<Scenario>
  markets!: Table<Market>

  statuses!: Table<Status>

  timestamps!: Table<Data>
  opens!: Table<Data>
  highs!: Table<Data>
  lows!: Table<Data>
  closes!: Table<Data>
  volumes!: Table<Data>

  indexes!: Table<Index>
  prices!: Table<Price>

  constructor() {
    super("PriceSimulator")

    this.version(1).stores({
      timer: "id",

      scenarios: "code, name",
      markets: "symbol, name",

      statuses: "symbol",

      timestamps: "symbol",
      opens: "symbol",
      highs: "symbol",
      lows: "symbol",
      closes: "symbol",
      volumes: "symbol",

      indexes: "symbol",
      prices: "symbol",
    })

    this.id = generateID()
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const db = new PriceSimulatorDexie()

db.on("ready", function () {
  // db.loadCache()
  // window.addEventListener("onbeforeunload", async () => {
  //   const id = db.id
  //   const collection = await db.status.limit(1)
  //   const currentStatus = await collection.first()
  //   const newStatus = { isTimerActive: false }
  //   if (currentStatus?.id === id) {
  //     await collection.modify({ ...currentStatus, ...newStatus, id })
  //   }
  // })
})

export default db
