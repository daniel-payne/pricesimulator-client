import Dexie from "dexie"

import db, { DEFAULT_SPREAD } from "@/data/indexDB/db"

import binarySearch from "@/utilities/binarySearch"

import type { Price } from "../types/Price"
import synchronizeTrendForSymbol from "../actions/synchronizeTrendsForSymbol"
import { Trend } from "../types/Trend"

export default function calculatePriceFromTrend(symbol?: string, trend?: Trend, day?: string, indexHint?: number) {
  if (symbol == null || trend == null || day == null) {
    return undefined
  }

  const spread = DEFAULT_SPREAD

  const timestamp = new Date(day).getTime()

  const { timestamps } = trend

  let index: number | undefined
  let price: Price | undefined
  let indexEnd: number | undefined

  if (timestamps != null && timestamps.length > 0) {
    indexEnd = timestamps.length - 1

    if (indexHint == null) {
      index = binarySearch(timestamps, timestamp)
    } else {
      const indexStart = Math.abs(indexHint)

      const plusOne = timestamps[indexStart + 1]
      const plusTwo = timestamps[indexStart + 2]
      const plusThree = timestamps[indexStart + 3]
      const plusFour = timestamps[indexStart + 4]
      const plusFive = timestamps[indexStart + 5]
      const plusSix = timestamps[indexStart + 6]

      // const differenceOne = plusOne - timestamp
      // const differenceTwo = plusTwo - timestamp
      // const differenceThree = plusThree - timestamp
      // const differenceFour = plusFour - timestamp
      // const differenceFive = plusFive - timestamp
      // const differenceSix = plusSix - timestamp

      if (timestamp === plusOne) {
        index = indexStart + 1
      } else if (timestamp === plusTwo) {
        index = indexStart + 2
      } else if (timestamp === plusThree) {
        index = indexStart + 3
      } else if (timestamp === plusFour) {
        index = indexStart + 4
      } else if (timestamp === plusFive) {
        index = indexStart + 5
      } else if (timestamp === plusSix) {
        index = indexStart + 6
      } else {
        index = binarySearch(timestamps, timestamp)
      }
    }
  }

  if (trend != null && index != null && indexEnd != null) {
    const marketClosed = index <= -0

    const lastIndex = Math.abs(index) - 1
    const currentIndex = Math.abs(index)
    const nextIndex = Math.abs(index) + 1

    let open
    let high
    let low
    let close

    let lastClose
    let nextOpen

    let midRangePrice
    let midDayPrice

    let bid
    let offer

    if (marketClosed) {
      lastClose = lastIndex > 0 ? trend.closes[lastIndex] : undefined
      nextOpen = nextIndex <= indexEnd ? trend.opens[nextIndex] : undefined

      if (nextOpen) {
        bid = nextOpen * (1 + spread)
        offer = nextOpen * (1 - spread)
      }
    } else {
      open = trend.opens[currentIndex]
      close = trend.closes[currentIndex]
      high = trend.highs[currentIndex]
      low = trend.lows[currentIndex]

      midRangePrice = Math.random() * (high - low) + low
      midDayPrice = Math.random() * Math.abs(open - close) + Math.min(open, close)

      bid = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 + spread)
      offer = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 - spread)
    }

    price = {
      symbol,
      timestamp,

      marketClosed,

      open,
      high,
      low,
      close,

      lastClose,
      nextOpen,

      midRangePrice,
      midDayPrice,

      bid,
      offer,

      currentIndex,
    }
  }

  return price
}
