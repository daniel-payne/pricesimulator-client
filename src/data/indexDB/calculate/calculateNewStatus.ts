import getStatus from "../controllers/get/getStatus"
import getTrends from "../controllers/get/getTrends"
import calculateIndexForSymbolDay from "./calculateIndexForSymbolDay"
import calculatePriceForSymbolIndex from "./calculatePriceForSymbolIndex"

export default async function calculateNewStatus() {
  const oldStatus = await getStatus()
  // const markets = await getMarkets()
  const trends = await getTrends()
  // const trades = await getTrades()

  const newStatus = structuredClone(oldStatus)

  const day = oldStatus.currentDay

  if (day == null) {
    return newStatus
  }

  // const activeTrades = trades.filter((trade) => trade.isTradeActive === true)
  // const inactiveTrades = trades.filter((trade) => trade.isTradeActive === false)

  newStatus.trendCountForSymbol = {}
  newStatus.currentIndexForSymbol = {}
  newStatus.currentPriceForSymbol = {}

  for (const trend of trends) {
    const { symbol } = trend

    const trendCount = trend?.timestamps?.length

    const currentIndex = await calculateIndexForSymbolDay(symbol, day)
    const currentPrice = await calculatePriceForSymbolIndex(symbol, currentIndex.currentPosition)

    newStatus.trendCountForSymbol[symbol] = trendCount
    newStatus.currentIndexForSymbol[symbol] = currentIndex
    newStatus.currentPriceForSymbol[symbol] = currentPrice
  }

  return newStatus
}
