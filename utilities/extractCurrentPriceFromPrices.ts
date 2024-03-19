import { Price } from "@/data/indexDB/types/Price"
import binarySearch from "./binarySearch"
import { Prices } from "@/data/indexDB/types/Trend"

export default function extractCurrentPriceFromPrices(prices: Prices, currentDay: string): Price | undefined {
  if (prices == null || currentDay == null) {
    return undefined
  }

  const currentTimestamp = new Date(currentDay).getTime()

  const index = binarySearch(prices.timestamps, currentTimestamp)

  if (index <= -1) {
    const lastIndex = index * -1
    const lastDay = new Date(prices.timestamps[lastIndex - 1]).toISOString().substring(0, 10)

    const lastClose = prices.closes[lastIndex]
    const nextOpen = prices.opens[lastIndex + 1]

    return { symbol: prices.symbol, day: lastDay, marketClosed: true, index, lastClose, nextOpen }
  } else {
    const open = prices.opens[index]
    const high = prices.highs[index]
    const low = prices.lows[index]
    const close = prices.closes[index]

    return {
      symbol: prices.symbol,
      day: currentDay,
      marketClosed: false,
      index,
      open,
      high,
      low,
      close,
    }
  }
}
