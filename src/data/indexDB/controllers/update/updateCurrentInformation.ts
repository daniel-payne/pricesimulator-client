import getStatus from "../get/getStatus"
import getTrends from "../get/getTrends"
import calculateIndexForSymbolDay from "../../calculate/calculateIndexForSymbolDay"
import calculatePriceForSymbolIndex from "../../calculate/calculatePriceForSymbolIndex"

export default async function updateCurrentInformation() {
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

  newStatus.currentIndexForSymbol = {}
  newStatus.currentPriceForSymbol = {}

  for (const trend of trends) {
    const { symbol } = trend

    const currentIndexForSymbol = oldStatus?.currentIndexForSymbol ?? {}

    const currentPosition = currentIndexForSymbol[symbol]?.currentPosition

    const currentIndex = await calculateIndexForSymbolDay(symbol, day, currentPosition)
    const currentPrice = await calculatePriceForSymbolIndex(symbol, currentIndex.currentPosition)

    newStatus.currentIndexForSymbol[symbol] = currentIndex
    newStatus.currentPriceForSymbol[symbol] = currentPrice
  }

  return newStatus
}
