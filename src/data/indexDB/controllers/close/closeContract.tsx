import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"
import getTimer from "../get/getTimer"

import getMarketForSymbol from "../get/getMarketForSymbol"

import { DEFAULT_CONTRACT_COST } from "../../constants/DEFAULT_CONTRACT_COST"
import { TradeStatus } from "@/data/indexDB/enums/TradeStatus"
import generateID from "@/utilities/generateID"
import { setState } from "@keldan-systems/state-mutex"

export async function controller(db: PriceSimulatorDexie, id: string, removeMargin: boolean) {
  const activeTrade = await db.trades?.where({ id }).first()

  const symbol = activeTrade?.symbol

  const timer = await getTimer()
  // const data = await getDataForSymbol(symbol)
  const market = await getMarketForSymbol(symbol)

  const price = await db.prices?.where({ symbol }).first()

  const currentTimestamp = timer?.currentTimestamp

  if (activeTrade != null && market != null && currentTimestamp != null) {
    let exitPrice
    let exitCost

    if (activeTrade.size === 1) {
      if (price?.isMarketClosed) {
        exitPrice = price?.nextOpen
      } else {
        exitPrice = price?.currentClose
      }

      exitCost = DEFAULT_CONTRACT_COST
    } else {
      if (price?.isMarketClosed) {
        exitPrice = activeTrade.direction === "CALL" ? price?.nextOpeningBid : price?.nextOpeningAsk
      } else {
        exitPrice = activeTrade.direction === "CALL" ? price?.currentBid : price?.currentAsk
      }
    }

    if (exitPrice != null) {
      if (price != null) {
        const newContract = structuredClone(activeTrade)

        newContract.status = TradeStatus.CLOSED

        newContract.exitPrice = exitPrice
        newContract.exitCost = exitCost
        newContract.exitTimestamp = currentTimestamp

        newContract.exitDifference = newContract.exitPrice - newContract.entryPrice
        newContract.exitPercent = newContract.exitDifference / newContract.entryPrice

        const dollarDifference = newContract.exitPercent * newContract.entryValue

        newContract.profit = newContract.direction === "CALL" ? dollarDifference : dollarDifference * -1

        await db.trades?.put(newContract)

        if (removeMargin) {
          await db.margins?.delete(id)
        } else {
          await db.margins?.update(id, { status: TradeStatus.CLOSED })
        }

        await db.transactions?.add({
          id: generateID(),
          timestamp: currentTimestamp,
          type: "TRADE",
          value: newContract.profit,
        })

        setState("LAST-TRADE-FOR-" + newContract.symbol, newContract)

        return newContract
      }
    }
  }

  return undefined
}

export default function closeContract(id: string, removeFromActive = true) {
  return controller(db, id, removeFromActive)
}
