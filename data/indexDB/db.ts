import Dexie, { Table } from "dexie"

import loadScenarios from "../load/loadScenarios"
import loadMarkets from "../load/loadMarkets"
import loadPrices from "../load/loadPrices"

import type { Scenario } from "./types/Scenario"
import type { Market } from "./types/Market"
import type { Trend } from "./types/Trend"
import type { Price } from "./types/Price"
import type { Trade } from "./types/Trade"
import { Status, Speed } from "./types/Status"

import loadTrend from "../load/loadPrices"
import binarySearch from "@/utilities/binarySearch"
import generateID from "@/utilities/generateID"

export const SCENARIO_COUNT = 60
export const MARKETS_COUNT = 60

export const DEFAULT_SPREAD = 0.007
export const DEFAULT_START = "1981-2-09"

export const ONE_DAY = 60 * 60 * 24 * 1000

export class PriceSimulatorDexie extends Dexie {
  id: string
  // [index: string]: any

  scenarios!: Table<Scenario>
  markets!: Table<Market>
  trends!: Table<Trend>

  trades!: Table<Trade>
  prices!: Table<Price>

  status!: Table<Status>

  private timeout?: NodeJS.Timeout | number | null

  constructor() {
    super("PriceSimulator")

    this.version(11).stores({
      scenarios: "id, name",
      markets: "symbol, name, category",
      trends: "symbol",

      trades: "reference, isActive",

      prices: "[symbol+day]",

      status: "id",
    })

    this.id = generateID()
  }

  async currentStatus() {
    const id = this.id

    let collection = await this.status.limit(1)
    let status = await collection.first()

    const defaultStatus = { id, speed: Speed.slow, startDay: "1970-01-05", isActive: false }

    if (status == null) {
      await this.status.add({ ...defaultStatus, id })

      collection = await this.status.limit(1)
      status = await collection.first()
    }
    return { collection, status }
  }

  async updateStatus(newStatus: Status) {
    const id = this.id

    const collection = await this.status.limit(1)
    const currentStatus = await collection.first()

    const defaultStatus = { id, speed: Speed.slow, startDay: "1970-01-05", isActive: false }

    if (currentStatus == null) {
      await this.status.add({ ...defaultStatus, ...newStatus, id })
    } else {
      await collection.modify({ ...currentStatus, ...newStatus, id })
    }
  }

  async startTimer(speed?: Speed) {
    if (speed != null) {
      this.updateStatus({ speed, isActive: true })
    } else {
      this.updateStatus({ isActive: true })
    }

    this.nextDay()
  }

  async stopTimer() {
    if (this.timeout != null) {
      window.clearTimeout(this.timeout)
    }

    this.updateStatus({ isActive: false })
  }

  private async nextDay() {
    db.transaction("rw", this.status, async () => {
      const { status, collection } = await this.currentStatus()

      if (status?.id === this.id && status.isActive === true) {
        const currentDay = status.currentDay

        const oldDate = new Date(currentDay ?? DEFAULT_START)

        const newDate = new Date(oldDate.getTime() + ONE_DAY)

        const newDay = newDate.toISOString().substring(0, 10)

        this.updateStatus({ currentDay: newDay })
      }
    })
      .then(async () => {
        const { status } = await this.currentStatus()
        const { speed, isActive } = status ?? {}

        if (isActive === true) {
          this.timeout = window.setTimeout(() => {
            this.nextDay()
          }, speed ?? Speed.slow)
        }
      })
      .catch((err) => {
        console.error(err.stack)
      })
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async synchronizeAllScenarios() {
//   const count = await db.scenarios.count()

//   if (count < SCENARIO_COUNT) {
//     const scenarios = await loadScenarios()

//     await db.scenarios.bulkPut(scenarios).catch(Dexie.BulkError, function (e) {
//       console.error("loadScenarios Loading Error: " + e.failures.length)
//     })
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async synchronizeAllMarkets() {
//   const count = await db.markets.count()

//   if (count < MARKETS_COUNT) {
//     const markets = await loadMarkets()

//     await db.markets.bulkPut(markets).catch(Dexie.BulkError, function (e) {
//       console.error("loadMarkets Loading Error: " + e.failures.length)
//     })
//   }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async synchronizeTrendForSymbol(symbol: string) {
//   const count = await db.trends.where({ symbol }).count()

//   if (count === 0) {
//     const prices = await loadPrices(symbol)

//     const firstTimestamp = prices.timestamps[0]
//     const secondTimestamp = prices.timestamps[1]
//     const lastTimestamp = prices.timestamps[prices.timestamps.length - 1]

//     prices.symbol = symbol

//     await db.trends.put(prices).catch(Dexie.BulkError, function (e) {
//       console.error("loadMarkets Loading Error: " + e.failures.length)
//     })
//   }

// const market = await db.markets.where({ symbol }).first()

// const hasNoData = market && (market.dataCount ?? 0) === 0
// const isNotLoading = market && market.dataStatus == null

// if (hasNoData && isNotLoading) {
//   await db.markets.update(symbol, { dataStatus: "LOADING" })

//   const trends = await loadTrends(symbol)

//   const firstTimestamp = trends.timestamps[0]
//   const secondTimestamp = trends.timestamps[1]
//   const lastTimestamp = trends.timestamps[trends.timestamps.length - 1]

//   trends.symbol = symbol

//   await db.trends.put(trends).catch(Dexie.BulkError, function (e) {
//     console.error("loadMarkets Loading Error: " + e.failures.length)
//   })

//   await db.markets.update(symbol, { dataStatus: undefined, dataCount: trends.timestamps.length, firstTimestamp, secondTimestamp, lastTimestamp })
// }
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async scenariosForApp() {
//   let scenarios = this.scenarioCache

//   if (Object.keys(scenarios).length === 0) {
//     scenarios = await (
//       await db.scenarios.toArray()
//     ).reduce((acc: any, scenario) => {
//       acc[scenario.id] = scenario
//       return acc
//     }, {})

//     this.scenarioCache = scenarios
//   }

//   if (Object.keys(scenarios).length === 0) {
//     await this.synchronizeAllScenarios()

//     scenarios = await (
//       await db.scenarios.toArray()
//     ).reduce((acc: any, scenario) => {
//       acc[scenario.id] = scenario
//       return acc
//     }, {})

//     this.scenarioCache = scenarios
//   }

//   return Object.keys(this.scenarioCache).map((key) => this.scenarioCache[key])
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async scenarioForId(id: string) {
//   let scenario = this.scenarioCache[id]

//   if (scenario == null) {
//     scenario = await db.scenarios.get(id)

//     this.scenarioCache[id] = scenario
//   }

//   if (scenario == null) {
//     await this.synchronizeAllScenarios()

//     scenario = await db.scenarios.get(id)

//     this.scenarioCache[id] = scenario
//   }

//   return scenario
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async marketsForApp() {
//   let markets = this.marketCache

//   if (Object.keys(markets).length === 0) {
//     markets = await (
//       await db.markets.toArray()
//     ).reduce((acc: any, market) => {
//       acc[market.symbol] = market
//       return acc
//     }, {})

//     this.marketCache = markets
//   }

//   if (Object.keys(markets).length === 0) {
//     await this.synchronizeAllMarkets()

//     markets = await (
//       await db.markets.toArray()
//     ).reduce((acc: any, market) => {
//       acc[market.symbol] = market
//       return acc
//     }, {})

//     this.marketCache = markets
//   }

//   return Object.keys(this.marketCache).map((key) => this.marketCache[key])
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async marketForSymbol(symbol: string) {
//   let market = this.marketCache[symbol]

//   if (market == null) {
//     market = await db.markets.get(symbol)

//     this.marketCache[symbol] = market
//   }

//   if (market == null) {
//     await this.synchronizeAllMarkets()

//     market = await db.markets.get(symbol)

//     this.marketCache[symbol] = market
//   }

//   return market
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async trendsForSymbol(symbol: string) {
//   let trends = this.trendsCache[symbol]

//   if (trends == null) {
//     trends = await db.trends.get(symbol)

//     this.trendsCache[symbol] = trends
//   }

//   if (trends == null) {
//     await this.synchronizeTrendsForSymbol(symbol)

//     trends = await db.trends.get(symbol)

//     this.trendsCache[symbol] = trends
//   }

//   return trends
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// public async priceForSymbolAndDay(symbol: string, day: string, indexHint?: number) {
//   const timestamp = new Date(day).getTime()

//   const trends = await this.trendsForSymbol(symbol)

//   const spread = DEFAULT_SPREAD

//   const { timestamps } = trends ?? {}

//   let index: number | undefined
//   let price: Price | undefined
//   let indexEnd: number | undefined

//   if (timestamps != null && timestamps.length > 0) {
//     indexEnd = timestamps.length - 1

//     if (indexHint == null) {
//       index = binarySearch(timestamps, timestamp)
//     } else {
//       const indexStart = Math.abs(indexHint)

//       switch (timestamp) {
//         case timestamps[indexStart + 1]:
//           index = indexStart + 1
//           break
//         case timestamps[indexStart + 2]:
//           index = indexStart + 2
//           break
//         case timestamps[indexStart + 3]:
//           index = indexStart + 3
//           break
//         case timestamps[indexStart + 4]:
//           index = indexStart + 4
//           break
//         default:
//           index = binarySearch(timestamps, timestamp)
//           break
//       }
//     }

//     index = binarySearch(timestamps, timestamp)
//   }

//   if (trends != null && index != null && indexEnd != null) {
//     const marketClosed = index <= -0

//     const lastIndex = Math.abs(index) - 1
//     const currentIndex = Math.abs(index)
//     const nextIndex = Math.abs(index) + 1

//     let open
//     let high
//     let low
//     let close

//     let lastClose
//     let nextOpen

//     let midRangePrice
//     let midDayPrice

//     let bid
//     let offer

//     if (marketClosed) {
//       lastClose = lastIndex > 0 ? trends.closes[lastIndex] : undefined
//       nextOpen = nextIndex <= indexEnd ? trends.opens[nextIndex] : undefined

//       bid = nextOpen * (1 + spread)
//       offer = nextOpen * (1 - spread)
//     } else {
//       open = trends.opens[currentIndex]
//       close = trends.closes[currentIndex]
//       high = trends.highs[currentIndex]
//       low = trends.lows[currentIndex]

//       midRangePrice = Math.random() * (high - low) + low
//       midDayPrice = Math.random() * Math.abs(open - close) + Math.min(open, close)

//       bid = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 + spread)
//       offer = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 - spread)
//     }

//     price = {
//       symbol,
//       timestamp,

//       marketClosed,

//       open,
//       high,
//       low,
//       close,

//       lastClose,
//       nextOpen,

//       midRangePrice,
//       midDayPrice,

//       bid,
//       offer,

//       currentIndex,
//     }
//   }

//   return price
// }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//}

const db = new PriceSimulatorDexie()

db.on("ready", function () {
  db.markets?.toCollection()?.modify({ dataStatus: undefined })
  // .then(() => {
  //   db.synchronizeAllScenarios().then(() => {
  //     db.synchronizeAllMarkets()
  //   })
  // })
  window.addEventListener("onbeforeunload", () => {
    db.updateStatus({ isActive: false })
  })
})

export default db
