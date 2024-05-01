import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import type { Trade } from "../../types/Trade"
import generateID from "@/utilities/generateID"

import getMarketForSymbol from "../get/getMarketForSymbol"

import getStatus from "../get/getStatus"

export async function controller(db: PriceSimulatorDexie, symbol: string, notionalAmount: number, tradeDirection: "CALL" | "PUT") {
  const status = await getStatus()

  const market = await getMarketForSymbol(symbol)

  if (market == null) {
    return
  }

  const { currentPrice } = market

  if (currentPrice == null) {
    return
  }

  const reference = generateID()

  const openingDay = status.currentDay

  let openingRate

  if (tradeDirection === "CALL") {
    openingRate = currentPrice?.offer
  } else {
    openingRate = currentPrice?.bid
  }

  const trade = {
    reference,
    symbol,

    notionalAmount,
    tradeDirection,

    openingDay,
    openingRate,

    isTradeActive: true,
  } as Trade

  await db.trades?.add(trade)

  return trade
}

export default function openTrade(symbol: string, notionalAmount: number, tradeDirection: "CALL" | "PUT") {
  return controller(db, symbol, notionalAmount, tradeDirection)
}
