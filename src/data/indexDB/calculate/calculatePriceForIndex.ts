import { Price } from "../types/Price"
import { DEFAULT_SPREAD } from "../constants/DEFAULT_SPREAD"

export default async function calculatePriceForIndex(
  symbol: string,
  timestamps?: Array<number>,
  opens?: Array<number>,
  highs?: Array<number>,
  lows?: Array<number>,
  closes?: Array<number>,
  index?: number | undefined,
  spread: number = DEFAULT_SPREAD
) {
  if (index == null || timestamps == null) {
    return null
  }

  const indexEnd = timestamps.length - 1

  let price: Price | undefined

  if (indexEnd != null) {
    const marketClosed = index <= 0

    const lastIndex = Math.abs(index) - 1
    const currentIndex = Math.abs(index)
    const nextIndex = Math.abs(index) + 1

    const timestamp = timestamps[currentIndex]

    let open
    let high
    let low
    let close

    let lastOpen
    let lastClose
    let nextOpen

    let midRangePrice
    let midDayPrice

    let bid
    let offer

    if (marketClosed) {
      lastOpen = currentIndex > 0 ? opens[currentIndex] : undefined
      lastClose = currentIndex > 0 ? closes[currentIndex] : undefined
      nextOpen = nextIndex <= indexEnd ? opens[nextIndex] : undefined

      if (nextOpen) {
        bid = nextOpen * (1 + spread)
        offer = nextOpen * (1 - spread)
      }
    } else {
      // timestamp = trend.timestamps[currentIndex]

      open = opens[currentIndex]
      close = closes[currentIndex]
      high = highs[currentIndex]
      low = lows[currentIndex]

      lastOpen = lastIndex > 0 ? opens[lastIndex] : undefined
      lastClose = lastIndex > 0 ? closes[lastIndex] : undefined

      midRangePrice = Math.random() * (high - low) + low
      midDayPrice = Math.random() * Math.abs(open - close) + Math.min(open, close)

      bid = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 + spread)
      offer = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 - spread)
    }

    const hasIntraDayPrices = !(open === close && high === low)

    price = {
      symbol,
      timestamp,

      marketClosed,

      open,
      high,
      low,
      close,

      lastOpen,
      lastClose,
      nextOpen,

      midRangePrice,
      midDayPrice,

      bid,
      offer,

      currentIndex,

      hasIntraDayPrices,
    }
  }

  return price
}
