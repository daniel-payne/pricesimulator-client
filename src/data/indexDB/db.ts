import Dexie, { Table } from "dexie"

// import loadScenarios from "../load/loadScenarios"
// import loadMarkets from "../load/loadMarkets"
// import loadPrices from "../load/loadPrices"

import type { Status } from "./types/Status"
import type { Scenario } from "./types/Scenario"
import type { Market } from "./types/Market"
import type { Trend } from "./types/Trend"
import type { Trade } from "./types/Trade"

import generateID from "@/utilities/generateID"
// import { ScenarioSpeed } from "./enums/ScenarioSpeed"
import loadScenarios from "../load/loadScenarios"
import loadMarkets from "../load/loadMarkets"
import loadTrend from "../load/loadTrend"

export const SCENARIO_COUNT = 60
export const MARKETS_COUNT = 60

export const DEFAULT_SPREAD = 0.007
export const DEFAULT_START = "1981-2-09"

export const ONE_DAY = 60 * 60 * 24 * 1000

export class PriceSimulatorDexie extends Dexie {
  id: string
  timeout: number | null = null

  status!: Table<Status>
  scenarios!: Table<Scenario>
  markets!: Table<Market>
  trends!: Table<Trend>
  trades!: Table<Trade>

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  constructor() {
    super("PriceSimulator")

    this.version(2).stores({
      status: "id",
      scenarios: "id, name",
      markets: "symbol, name, category",
      trends: "symbol",

      trades: "reference, isActive",
    })

    this.id = generateID()
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // async currentStatus() {
  //   const id = this.id
  //   let collection = await this.status.limit(1)
  //   let status = await collection.first()
  //   const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isActive: false }
  //   if (status == null) {
  //     await this.status.add({ ...defaultStatus, id })
  //     collection = await this.status.limit(1)
  //     status = await collection.first()
  //   }
  //   return status
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // async updateStatus(newStatus: Status = {}) {
  //   const id = this.id
  //   const collection = await this.status.limit(1)
  //   const currentStatus = await collection.first()
  //   const defaultStatus = { id, speed: ScenarioSpeed.slow, startDay: "1970-01-05", currentDay: "1970-01-05", isActive: false }
  //   if (currentStatus == null) {
  //     await this.status.add({ ...defaultStatus, ...newStatus, id })
  //   } else {
  //     await collection.modify({ ...currentStatus, ...newStatus, id })
  //   }
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // async startTimer(speed?: ScenarioSpeed) {
  //   if (this.timeout != null) {
  //     window.clearTimeout(this.timeout)
  //   }
  //   if (speed != null) {
  //     this.updateStatus({ speed, isActive: true })
  //   } else {
  //     this.updateStatus({ isActive: true })
  //   }
  //   this.nextDay()
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // async stopTimer() {
  //   if (this.timeout != null) {
  //     window.clearTimeout(this.timeout)
  //   }
  //   this.updateStatus({ isActive: false })
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // private async nextDay() {
  //   this.transaction("rw", this.status, async () => {
  //     const status = await this.currentStatus()
  //     if (status?.id === this.id && status.isActive === true) {
  //       const currentDay = status.currentDay
  //       const oldDate = new Date(currentDay ?? DEFAULT_START)
  //       const newDate = new Date(oldDate.getTime() + ONE_DAY)
  //       const newDay = newDate.toISOString().substring(0, 10)
  //       this.updateStatus({ currentDay: newDay })
  //     }
  //   })
  //     .then(async () => {
  //       const status = await this.currentStatus()
  //       const { speed, isActive } = status ?? {}
  //       if (isActive === true) {
  //         // eslint-disable-next-line @typescript-eslint/no-this-alias
  //         const self = this
  //         this.timeout = window.setTimeout(() => {
  //           self.nextDay()
  //         }, speed ?? ScenarioSpeed.slow)
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err.stack)
  //     })
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async synchronizeAllScenarios() {
    const count = await this.scenarios.count()

    if (count < SCENARIO_COUNT) {
      const scenarios = await loadScenarios()

      await this.scenarios.bulkPut(scenarios).catch(Dexie.BulkError, function (e) {
        console.error("loadScenarios Loading Error: " + e.failures.length)
      })
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async synchronizeAllMarkets() {
    const count = await this.markets.count()

    if (count < MARKETS_COUNT) {
      const markets = await loadMarkets()

      await this.markets.bulkPut(markets).catch(Dexie.BulkError, function (e) {
        console.error("loadMarkets Loading Error: " + e.failures.length)
      })
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async synchronizeAllTrends() {
    const markets = await this.markets.toArray()

    const synchronizeTrends = markets.map((market) => {
      return db.synchronizeTrendForSymbol(market.symbol)
    })

    await Promise.all(synchronizeTrends)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async synchronizeTrendForSymbols(symbols: Array<string>) {
    const synchronizeTrends = symbols.map((symbol) => {
      return db.synchronizeTrendForSymbol(symbol)
    })

    await Promise.all(synchronizeTrends)
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  public async synchronizeTrendForSymbol(symbol: string) {
    const market = await this.markets.where({ symbol }).first()

    const hasNoData = market && (market.dataCount ?? 0) === 0
    const isNotLoading = market && market.dataStatus == null

    if (hasNoData && isNotLoading) {
      await this.markets.update(symbol, { dataStatus: "LOADING" })

      const trends = await loadTrend(symbol)

      const firstTimestamp = trends.timestamps[0]
      const secondTimestamp = trends.timestamps[1]
      const lastTimestamp = trends.timestamps[trends.timestamps.length - 1]

      trends.symbol = symbol

      await this.trends.put(trends).catch(Dexie.BulkError, function (e) {
        console.error("loadMarkets Loading Error: " + e.failures.length)
      })

      await this.markets.update(symbol, { dataStatus: undefined, dataCount: trends.timestamps.length, firstTimestamp, secondTimestamp, lastTimestamp })
    }
  }

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

  //   return Object.keys(this.scenarioCache).map((key) => this.scenarioCache[key]) as Array<Scenario>
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // public async scenarioForId(id: string) {
  //   let scenario = this.scenarioCache[id]

  //   if (scenario == null) {
  //     scenario = await this.scenarios.get(id)

  //     this.scenarioCache[id] = scenario
  //   }

  //   if (scenario == null) {
  //     await this.synchronizeAllScenarios()

  //     scenario = await this.scenarios.get(id)

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

  //   return Object.keys(this.marketCache).map((key) => this.marketCache[key]) as Array<Market>
  // }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // public async marketForSymbol(symbol: string) {
  //   let market = this.marketCache[symbol]

  //   if (market == null) {
  //     market = await this.markets.get(symbol)

  //     this.marketCache[symbol] = market
  //   }

  //   if (market == null) {
  //     await this.synchronizeAllMarkets()

  //     market = await this.markets.get(symbol)

  //     this.marketCache[symbol] = market
  //   }

  //   return market
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // public async trendForSymbol(symbol: string) {
  //   let trends = this.trendCache[symbol]

  //   if (trends == null) {
  //     trends = await this.trends.get(symbol)

  //     this.trendCache[symbol] = trends
  //   }

  //   if (trends == null) {
  //     await this.synchronizeTrendForSymbol(symbol)

  //     trends = await this.trends.get(symbol)

  //     this.trendCache[symbol] = trends
  //   }

  //   return trends
  // }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // public async priceForSymbolAndDay(symbol: string, day: string) {
  //   const indexHint = this.indexCache[symbol]
  //   const timestamp = new Date(day).getTime()

  //   const trend = await this.trendForSymbol(symbol)

  //   const spread = DEFAULT_SPREAD

  //   const { timestamps } = trend ?? {}

  //   let index: number | undefined
  //   let price: Price | undefined
  //   let indexEnd: number | undefined

  //   if (timestamps != null && timestamps.length > 0) {
  //     indexEnd = timestamps.length - 1

  //     if (indexHint == null) {
  //       index = binarySearch(timestamps, timestamp)
  //     } else {
  //       const indexStart = Math.abs(indexHint)

  //       // const plusOne = timestamps[indexStart + 1]
  //       // const plusTwo = timestamps[indexStart + 2]
  //       // const plusThree = timestamps[indexStart + 3]
  //       // const plusFour = timestamps[indexStart + 4]
  //       // const plusFive = timestamps[indexStart + 5]
  //       // const plusSix = timestamps[indexStart + 6]

  //       // const differenceOne = plusOne - timestamp
  //       // const differenceTwo = plusTwo - timestamp
  //       // const differenceThree = plusThree - timestamp
  //       // const differenceFour = plusFour - timestamp
  //       // const differenceFive = plusFive - timestamp
  //       // const differenceSix = plusSix - timestamp

  //       if (timestamp === timestamps[indexStart + 1]) {
  //         index = indexStart + 1
  //       } else if (timestamp === timestamps[indexStart + 2]) {
  //         index = indexStart + 2
  //       } else if (timestamp === timestamps[indexStart + 3]) {
  //         index = indexStart + 3
  //       } else if (timestamp === timestamps[indexStart + 4]) {
  //         index = indexStart + 4
  //       } else if (timestamp === timestamps[indexStart + 5]) {
  //         index = indexStart + 5
  //       } else if (timestamp === timestamps[indexStart + 6]) {
  //         index = indexStart + 6
  //       } else {
  //         index = binarySearch(timestamps, timestamp)
  //       }
  //     }

  //     this.indexCache[symbol] = index
  //   }

  //   if (trend != null && index != null && indexEnd != null) {
  //     const marketClosed = index < 0

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
  //       lastClose = lastIndex > 0 ? trend.closes[lastIndex] : undefined
  //       nextOpen = nextIndex <= indexEnd ? trend.opens[nextIndex] : undefined

  //       if (nextOpen != null) {
  //         bid = nextOpen * (1 + spread)
  //         offer = nextOpen * (1 - spread)
  //       }
  //     } else {
  //       open = trend.opens[currentIndex]
  //       close = trend.closes[currentIndex]
  //       high = trend.highs[currentIndex]
  //       low = trend.lows[currentIndex]

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
}

const db = new PriceSimulatorDexie()

db.on("ready", function () {
  db.markets?.toCollection()?.modify({ dataStatus: undefined })

  window.addEventListener("onbeforeunload", async () => {
    const id = db.id

    const collection = await db.status.limit(1)
    const currentStatus = await collection.first()

    const newStatus = { isActive: false }

    if (currentStatus?.id === id) {
      await collection.modify({ ...currentStatus, ...newStatus, id })
    }
  })
})

export default db
