import { ScenarioSpeed } from "../enums/ScenarioSpeed"
import { Index } from "./Index"
import { Price } from "./Price"

type DataStatus = {
  trendCount?: number
  firstActiveTimestamp?: number
  firstInterdayTimestamp?: number
  isMarketOpen?: boolean
}

export type Status = {
  id?: string

  startDay?: string
  speed?: ScenarioSpeed

  currentTimestamp?: number
  currentDay?: string

  isTimerActive?: boolean

  dataStatusForSymbol?: Record<string, DataStatus | null | undefined>
  currentIndexForSymbol?: Record<string, Index | null | undefined>
  currentPriceForSymbol?: Record<string, Price | null | undefined>

  currentMarginForReference?: Record<string, number>

  deposits?: Array<{ day: string; amount: number }>

  currentMargin?: number
  currentProfit?: number
  currentBalance?: number
  currentLeverage?: number
}
