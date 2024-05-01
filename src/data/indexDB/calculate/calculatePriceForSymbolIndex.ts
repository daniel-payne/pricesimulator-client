import getTrendForSymbol from "../controllers/get/getTrendForSymbol"
import { Price } from "../types/Price"
import { DEFAULT_SPREAD } from "../constants/DEFAULT_SPREAD"

export default async function calculatePriceForSymbolIndex(symbol: string, index: number | undefined) {
  const spread = DEFAULT_SPREAD

  const trend = await getTrendForSymbol(symbol)

  if (index == null || trend?.timestamps == null) {
    return null
  }

  const indexEnd = trend.timestamps.length - 1

  let price: Price | undefined

  if (trend != null && index != null && indexEnd != null) {
    const marketClosed = index <= 0

    const lastIndex = Math.abs(index) - 1
    const currentIndex = Math.abs(index)
    const nextIndex = Math.abs(index) + 1

    const timestamp = trend.timestamps[currentIndex]

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
      // timestamp = trend.timestamps[currentIndex]

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
