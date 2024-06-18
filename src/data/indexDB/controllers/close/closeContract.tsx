import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import getTimer from "../get/getTimer"

import getMarketForSymbol from "../get/getMarketForSymbol"

import { DEFAULT_CONTRACT_COST } from "../../constants/DEFAULT_CONTRACT_COST"

export async function controller(db: PriceSimulatorDexie, id: string) {
  const activeTrade = await db.activeTrades?.where({ id }).first()

  const symbol = activeTrade?.symbol

  const timer = await getTimer()
  // const data = await getDataForSymbol(symbol)
  const market = await getMarketForSymbol(symbol)

  const price = await db.prices?.where({ symbol }).first()

  const currentTimestamp = timer?.currentTimestamp

  // const timestamps = data?.timestamps
  // const opens = data?.opens
  // const highs = data?.highs
  // const lows = data?.lows
  // const closes = data?.closes

  const tradePrice = price?.marketClosed ? price?.nextOpen : price?.close

  let notionalPrice

  if (activeTrade != null && tradePrice != null) {
    notionalPrice = activeTrade.direction === "CALL" ? tradePrice + DEFAULT_CONTRACT_COST : tradePrice - DEFAULT_CONTRACT_COST
  }

  if (activeTrade != null && market != null && currentTimestamp != null && notionalPrice != null) {
    // const spread = market.spread

    // const notional = activeTrade.size * market.contractSize * market.dollarModifier * notionalPrice

    // const index = await calculateIndexForTimestamp(timestamps, currentTimestamp)

    // const price = await calculatePriceForIndex(symbol, timestamps, opens, highs, lows, closes, index, spread, currentTimestamp)

    if (price != null) {
      let exitPrice

      if (price.marketClosed) {
        exitPrice = activeTrade.direction === "CALL" ? price.nextBid : price.nextOffer
      } else {
        if (Math.random() > 0.85 && activeTrade.size !== 1) {
          exitPrice = activeTrade.direction === "CALL" ? price.bid : price.offer
        } else {
          exitPrice = activeTrade.direction === "CALL" ? price.closingBid : price.closingOffer
        }
      }

      const newContract = structuredClone(activeTrade)

      newContract.exitPrice = exitPrice
      newContract.exitTimestamp = currentTimestamp

      newContract.profit = (newContract.exitPrice - newContract.entryPrice) * (market.dollarModifier ?? 1) * newContract.notional
      newContract.status = "CLOSED"

      await db.inactiveTrades?.put(newContract)
      await db.activeTrades?.delete(newContract.symbol)

      return newContract
    }
  }

  return undefined
}

export default function closeContract(id: string) {
  return controller(db, id)
}
