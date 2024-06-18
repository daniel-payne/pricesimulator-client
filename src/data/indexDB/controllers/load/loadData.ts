import db from "@/data/indexDB/db"

import type { PriceSimulatorDexie } from "@/data/indexDB/db"

import { setState } from "@keldan-systems/state-mutex"

import { controller as getScenarios } from "@/data/indexDB/controllers/get/getScenarios"
import { controller as getMarkets } from "@/data/indexDB/controllers/get/getMarkets"
import { controller as getTimer } from "@/data/indexDB/controllers/get/getTimer"
import { controller as getDataForSymbol } from "@/data/indexDB/controllers/get/getDataForSymbol"
import { controller as updatePrice } from "@/data/indexDB/controllers/update/updatePrice"

export async function controller(db: PriceSimulatorDexie) {
  setState("APPLICATION-STATUS", { message: "Loading Timer", dataLoaded: false })

  const timer = await getTimer(db)

  setState("APPLICATION-STATUS", { message: "Loading Scenarios" })

  await getScenarios(db)

  setState("APPLICATION-STATUS", { message: "Loading Markets" })

  const markets = await getMarkets(db)

  setState("APPLICATION-STATUS", { message: `Loading Market For First Scenario` })

  await getDataForSymbol(db, "LE.F")

  setState("APPLICATION-STATUS", { message: `Calculating Current Price For First Scenario` })

  await updatePrice(db, "LE.F", timer.currentTimestamp)

  for (let index = 0; index < markets.length; index++) {
    setState("APPLICATION-STATUS", { message: `Loading Market ${index} of ${markets.length}` })

    await getDataForSymbol(db, markets[index].symbol)

    setState("-STATUS", { message: `Loaded Market `, dataLoaded: true })
  }

  for (let index = 0; index < markets.length; index++) {
    setState("APPLICATION-STATUS", { message: `Calculating Current Price ${index} of ${markets.length}` })

    await updatePrice(db, markets[index].symbol, timer.currentTimestamp)
  }

  setState("APPLICATION-STATUS", { message: "All Markets Loaded", dataLoaded: true })
}

export default async function loadData() {
  return controller(db)
}
