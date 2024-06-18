import { Price } from "../types/Price"
import { DEFAULT_SPREAD } from "../constants/DEFAULT_SPREAD"

export default async function calculatePriceForIndex(
  symbol: string,
  timestamps?: Array<number> | null | undefined,
  opens?: Array<number> | null | undefined,
  highs?: Array<number> | null | undefined,
  lows?: Array<number> | null | undefined,
  closes?: Array<number> | null | undefined,
  index?: number | undefined,
  spread: number = DEFAULT_SPREAD,
  timestamp?: number
) {
  if (index == null || timestamps == null || timestamp == null) {
    return null
  }

  const indexEnd = timestamps.length - 1

  let price: Price | undefined

  if (indexEnd != null) {
    const marketClosed = index <= 0

    const lastIndex = Math.abs(index) - 1
    const currentIndex = Math.abs(index)
    const nextIndex = Math.abs(index) + 1

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

    let closingBid
    let closingOffer

    let nextBid
    let nextOffer

    if (opens != null && highs != null && lows != null && closes != null) {
      if (marketClosed) {
        lastOpen = currentIndex > 0 ? opens[currentIndex] : undefined
        lastClose = currentIndex > 0 ? closes[currentIndex] : undefined
        nextOpen = nextIndex <= indexEnd ? opens[nextIndex] : undefined

        if (nextOpen) {
          nextBid = nextOpen * (1 + spread)
          nextOffer = nextOpen * (1 - spread)
        }
      } else {
        open = opens[currentIndex]
        close = closes[currentIndex]
        high = highs[currentIndex]
        low = lows[currentIndex]

        lastOpen = lastIndex > 0 ? opens[lastIndex] : undefined
        lastClose = lastIndex > 0 ? closes[lastIndex] : undefined
        nextOpen = nextIndex <= indexEnd ? opens[nextIndex] : undefined

        midRangePrice = Math.random() * (high - low) + low
        midDayPrice = Math.random() * Math.abs(open - close) + Math.min(open, close)

        bid = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 + spread)
        offer = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 - spread)

        closingBid = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 + spread)
        closingOffer = ((3 * midRangePrice + 1 * midDayPrice) / 4) * (1 - spread)

        if (nextOpen != null) {
          nextBid = nextOpen * (1 + spread)
          nextOffer = nextOpen * (1 - spread)
        }
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

        closingBid,
        closingOffer,
        nextBid,
        nextOffer,

        currentIndex,

        hasIntraDayPrices,
      }
    }
  }

  return price
}
