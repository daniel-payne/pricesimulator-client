import Dexie from "dexie"

import db, { DEFAULT_SPREAD } from "@/data/indexDB/db"

import binarySearch from "@/utilities/binarySearch"

import type { Price } from "../types/Price"

export default async function priceForSymbolAndDay(symbol: string, day: string, indexHint?: number) {
  if (symbol == null && day == null) {
    return
  }

  const spread = DEFAULT_SPREAD

  const timestamp = new Date(day).getTime()

  let trends = await db.trends.where({ symbol }).first()

  if (trends == null && symbol != null) {
    await db.synchronizeTrendForSymbol(symbol)

    trends = await db.trends.where({ symbol }).first()
  }

  const { timestamps } = trends ?? {}

  let index: number | undefined
  let price: Price | undefined
  let indexEnd: number | undefined

  if (timestamps != null && timestamps.length > 0) {
    indexEnd = timestamps.length - 1

    if (indexHint == null) {
      index = binarySearch(timestamps, timestamp)
    } else {
      const indexStart = Math.abs(indexHint)

      switch (timestamp) {
        case timestamps[indexStart + 1]:
          index = indexStart + 1
          break
        case timestamps[indexStart + 2]:
          index = indexStart + 2
          break
        case timestamps[indexStart + 3]:
          index = indexStart + 3
          break
        case timestamps[indexStart + 4]:
          index = indexStart + 4
          break
        default:
          index = binarySearch(timestamps, timestamp)
          break
      }
    }

    index = binarySearch(timestamps, timestamp)
  }

  if (trends != null && index != null && indexEnd != null) {
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
      lastClose = lastIndex > 0 ? trends.closes[lastIndex] : undefined
      nextOpen = nextIndex <= indexEnd ? trends.opens[nextIndex] : undefined

      if (nextOpen) {
        bid = nextOpen * (1 + spread)
        offer = nextOpen * (1 - spread)
      }
    } else {
      open = trends.opens[currentIndex]
      close = trends.closes[currentIndex]
      high = trends.highs[currentIndex]
      low = trends.lows[currentIndex]

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
