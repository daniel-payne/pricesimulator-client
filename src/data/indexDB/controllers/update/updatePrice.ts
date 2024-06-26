import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import getMarketForSymbol from "../get/getMarketForSymbol"
import getDataForSymbol from "../get/getDataForSymbol"

import calculateIndexForTimestamp from "../../calculate/calculateIndexForTimestamp"
import calculatePriceForIndex from "../../calculate/calculatePriceForIndex"

import Dexie from "dexie"
import { TradeStatus } from "../../hooks/useTrades"

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
    const index = await calculateIndexForTimestamp(timestamps, timestamp, currentPrice?.currentIndex ?? currentPrice?.priorIndex)

    const price = await calculatePriceForIndex(symbol, timestamps, opens, highs, lows, closes, index, spread, timestamp)

    db.pricesCache[symbol] = price

    if (price != null) {
      await db.prices.put(price).catch(Dexie.BulkError, function (e) {
        console.error("getPriceForSymbolAndTimestamp Loading Error: " + e.failures.length)
      })

      const activeTrade = await db.trades?.where({ symbol, status: TradeStatus.OPEN }).first()

      if (activeTrade != null) {
        const newTrade = structuredClone(activeTrade)

        const currentPrice = newTrade.direction === "CALL" ? price.priorClosingBid : price.priorClosingAsk

        const currentDifference = newTrade.direction === "CALL" ? currentPrice - newTrade.entryPrice : newTrade.entryPrice - currentPrice

        const currentValue = currentPrice * (market?.dollarModifier ?? 1) * newTrade.amount

        const currentProfit = newTrade.direction === "CALL" ? currentValue - newTrade.entryValue : newTrade.entryValue - currentValue

        newTrade.margin = {
          currentPrice,
          currentDifference,
          currentValue,
          currentProfit,
        }

        await db.trades.put(newTrade).catch(Dexie.BulkError, function (e) {
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
