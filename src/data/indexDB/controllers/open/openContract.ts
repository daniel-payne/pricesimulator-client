import db from "@/data/indexDB/db"

import closeContract from "../close/closeContract"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import getTimer from "../get/getTimer"

import getMarketForSymbol from "../get/getMarketForSymbol"
import generateID from "@/utilities/generateID"

import { DEFAULT_CONTRACT_COST } from "../../constants/DEFAULT_CONTRACT_COST"

export async function controller(db: PriceSimulatorDexie, symbol: string, direction: "CALL" | "PUT", size: 0.25 | 0.5 | 1 | 2) {
  const activeTrade = await db.activeTrades?.where({ symbol }).first()

  if (activeTrade != null) {
    await closeContract(activeTrade.id)
  }

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

  if (tradePrice) {
    notionalPrice = direction === "CALL" ? tradePrice + DEFAULT_CONTRACT_COST : tradePrice - DEFAULT_CONTRACT_COST
  }

  if (market != null && currentTimestamp != null && notionalPrice != null) {
    // const spread = market.spread

    const notional = size * market.contractSize * market.dollarModifier * notionalPrice

    // const index = await calculateIndexForTimestamp(timestamps, currentTimestamp)

    // const price = await calculatePriceForIndex(symbol, timestamps, opens, highs, lows, closes, index, spread, currentTimestamp)

    if (price != null) {
      let entryPrice

      if (price.marketClosed) {
        entryPrice = direction === "CALL" ? price.nextBid : price.nextOffer
      } else {
        if (Math.random() > 0.85 && size !== 1) {
          entryPrice = direction === "CALL" ? price.bid : price.offer
        } else {
          entryPrice = direction === "CALL" ? price.closingBid : price.closingOffer
        }
      }

      const newContract = {
        id: generateID(),
        symbol,
        direction,
        size,
        notional,
        entryPrice,
        entryTimestamp: currentTimestamp,
        exitPrice: undefined,
        exitTimestamp: undefined,
        profit: undefined,
        status: "OPEN",
      }

      await db.activeTrades?.add(newContract)

      return newContract
    }
  }

  return undefined
}

export default function openContract(symbol: string, direction: "CALL" | "PUT", size: 0.25 | 0.5 | 1 | 2) {
  return controller(db, symbol, direction, size)
}
