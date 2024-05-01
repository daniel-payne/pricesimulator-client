import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import calculateIndexForSymbolDay from "../../calculate/calculateIndexForSymbolDay"
import calculatePriceForSymbolIndex from "../../calculate/calculatePriceForSymbolIndex"
import getMarkets from "../get/getMarkets"
import getStatus from "../get/getStatus"
import getTrends from "../get/getTrends"
import getTrades from "../get/getTrades"
import updateStatus from "./updateStatus"

export async function controller(db: PriceSimulatorDexie) {
  const status = await getStatus()
  // const markets = await getMarkets()
  const trends = await getTrends()
  const trades = await getTrades()

  // const day = status.currentDay

  // const activeTrades = trades.filter((trade) => trade.isTradeActive === true)
  // const inactiveTrades = trades.filter((trade) => trade.isTradeActive === false)

  const newStatus = structuredClone(status)

  newStatus.trendCountForSymbol = {}

  for (const trend of trends) {
    const { symbol } = trend

    newStatus.trendCountForSymbol[symbol] = trend?.timestamps?.length ?? 0
  }

  updateStatus(newStatus)

  // for (const market of markets) {
  //   const { symbol, currentIndex } = market

  //   const trend = await db.trends.where({ symbol }).first()

  //   if (day != null && trend != null) {
  //     const newIndex = await calculateIndexForSymbolDay(symbol, day)

  //     if (newIndex != null && newIndex !== currentIndex) {
  //       let isMarketActive = false
  //       let isMarketOpen = false

  //       if (newIndex != null) {
  //         isMarketActive = true

  //         if (newIndex >= 0) {
  //           isMarketOpen = true
  //         }
  //       }

  //       const currentPrice = await calculatePriceForSymbolIndex(symbol, newIndex)

  //       await db.markets.update(symbol, { currentIndex: newIndex, isMarketActive, isMarketOpen, currentPrice })

  //       for (const trade of activeTrades) {
  //         if (trade.symbol === symbol) {
  //           let currentRate

  //           if (trade.tradeDirection === "CALL") {
  //             currentRate = currentPrice?.offer
  //           } else {
  //             currentRate = currentPrice?.bid
  //           }

  //           await db.trades.update(trade.reference, { currentRate })
  //         }
  //       }
  //     }
  //   }
  // }
}

export default function updateStatusForCurrentDay() {
  return controller(db)
}
