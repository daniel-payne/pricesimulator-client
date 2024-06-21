import db from "@/data/indexDB/db"

import closeContract from "../close/closeContract"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import getTimer from "../get/getTimer"

import getMarketForSymbol from "../get/getMarketForSymbol"
import generateID from "@/utilities/generateID"

import { DEFAULT_CONTRACT_COST } from "../../constants/DEFAULT_CONTRACT_COST"
import lastOfMonth from "@/utilities/lastOfMonth"

export async function controller(db: PriceSimulatorDexie, symbol: string, direction: "CALL" | "PUT", size: 0.25 | 0.5 | 1 | 2) {
  const activeTrade = await db.activeTrades?.where({ symbol }).first()

  if (activeTrade != null) {
    await closeContract(activeTrade.id)
  }

  const timer = await getTimer()
  // const data = await getDataForSymbol(symbol)
  const market = await getMarketForSymbol(symbol)

  const price = await db.prices?.where({ symbol }).first()

  const entryTimestamp = timer?.currentTimestamp
  const expiryTimestamp = lastOfMonth(timer?.currentTimestamp, "WED", 3)?.getTime()

  let entryPrice
  let entryCost

  if (size === 1) {
    if (price?.isMarketClosed) {
      entryPrice = price?.nextOpen
    } else {
      entryPrice = price?.currentClose
    }

    entryCost = DEFAULT_CONTRACT_COST
  } else {
    if (price?.isMarketClosed) {
      entryPrice = direction === "CALL" ? price?.nextBid : price?.nextAsk
    } else {
      entryPrice = direction === "CALL" ? price?.currentBid : price?.currentAsk
    }
  }

  if (market != null && entryTimestamp != null && entryPrice != null) {
    const notional = size * market.contractSize * (market?.dollarModifier ?? 1) * entryPrice

    const entryValue = notional * entryPrice

    if (price != null) {
      const newContract = {
        id: generateID(),
        symbol,
        direction,
        size,
        notional,
        entryValue,
        entryPrice,
        entryCost,
        entryTimestamp,
        exitPrice: undefined,
        exitValue: undefined,
        exitCost: undefined,
        exitTimestamp: undefined,
        expiryTimestamp,
        profit: undefined,
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
