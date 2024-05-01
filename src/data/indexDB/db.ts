import Dexie, { Table } from "dexie"

import type { Status } from "./types/Status"
import type { Scenario } from "./types/Scenario"
import type { Market } from "./types/Market"
import type { Trend } from "./types/Trend"
import type { Trade } from "./types/Trade"

import generateID from "@/utilities/generateID"

import { controller as getStatus } from "./controllers/get/getStatus"
import { controller as getMarkets } from "./controllers/get/getMarkets"
import { controller as getScenarios } from "./controllers/get/getScenarios"

export class PriceSimulatorDexie extends Dexie {
  id: string
  timeout: number | null = null

  scenariosCache: Record<string, Scenario> = {}
  marketsCache: Record<string, Market> = {}
  trendsCache: Record<string, Trend> = {}

  status!: Table<Status>

  scenarios!: Table<Scenario>
  markets!: Table<Market>
  trends!: Table<Trend>
  trades!: Table<Trade>

  constructor() {
    super("PriceSimulator")

    this.version(12).stores({
      status: "id",

      scenarios: "code, name",

      markets: "symbol",
      trends: "symbol",

      trades: "ref, symbol, isOpen",
    })

    this.id = generateID()
  }

  async loadCache() {
    this.markets?.toCollection()?.modify({ dataStatus: undefined })

    await getStatus(this)
    await getScenarios(this)
    await getMarkets(this)

    const scenarios = await this.scenarios.toArray()
    const markets = await this.markets.toArray()
    const trends = await this.trends.toArray()

    this.scenariosCache = {}
    this.marketsCache = {}
    this.trendsCache = {}

    scenarios?.forEach((scenario) => {
      this.scenariosCache[scenario.code] = scenario
    })

    markets?.forEach((market) => {
      this.marketsCache[market.symbol] = market
    })

    trends?.forEach((trend) => {
      this.trendsCache[trend.symbol] = trend
    })
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const db = new PriceSimulatorDexie()

db.on("ready", function () {
  db.loadCache()

  window.addEventListener("onbeforeunload", async () => {
    const id = db.id

    const collection = await db.status.limit(1)
    const currentStatus = await collection.first()

    const newStatus = { isTimerActive: false }

    if (currentStatus?.id === id) {
      await collection.modify({ ...currentStatus, ...newStatus, id })
    }
  })
})

export default db
