import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import getMarketForSymbol from "../get/getMarketForSymbol"
import getDataForSymbol from "../get/getDataForSymbol"

import calculateIndexForTimestamp from "../../calculate/calculateIndexForTimestamp"
import calculatePriceForIndex from "../../calculate/calculatePriceForIndex"

import Dexie from "dexie"

export async function controller(db: PriceSimulatorDexie, symbol: string | undefined, timestamp: number | undefined) {
  if (symbol == null || timestamp == null) {
    return undefined
  }

  const currentPrice = db.pricesCache[symbol]

  if (currentPrice?.timestamp === timestamp) {
    return currentPrice
  }

  const market = await getMarketForSymbol(symbol)

  const spread = market?.spread

  const data = await getDataForSymbol(symbol)

  const timestamps = data?.timestamps
  const opens = data?.opens
  const highs = data?.highs
  const lows = data?.lows
  const closes = data?.closes

  if (timestamps != null) {
    const index = await calculateIndexForTimestamp(timestamps, timestamp, currentPrice?.currentIndex)

    const price = await calculatePriceForIndex(symbol, timestamps, opens, highs, lows, closes, index, spread, timestamp)

    db.pricesCache[symbol] = price

    if (price != null) {
      await db.prices.put(price).catch(Dexie.BulkError, function (e) {
        console.error("getPriceForSymbolAndTimestamp Loading Error: " + e.failures.length)
      })

      const activeTrade = await db.activeTrades?.where({ symbol }).first()

      if (activeTrade != null) {
        const newTrade = structuredClone(activeTrade)

        newTrade.currentPrice = newTrade.direction === "CALL" ? price.bid : price.offer

        newTrade.priceDifferential = newTrade.currentPrice - newTrade.entryPrice
        newTrade.dollarDifferential = newTrade.priceDifferential * (market?.dollarModifier ?? 1)
        newTrade.currentProfit = newTrade.dollarDifferential * newTrade.notional * (newTrade.direction === "CALL" ? 1 : -1)
        newTrade.currentNotional = newTrade.notional + newTrade.currentProfit

        await db.activeTrades.put(newTrade).catch(Dexie.BulkError, function (e) {
          console.error("getPriceForSymbolAndTimestamp Pricing Error: " + e.failures.length)
        })
      }

      return price
    }
  }
}

export default function updatePrice(symbol: string, timestamp: number) {
  return controller(db, symbol, timestamp)
}
