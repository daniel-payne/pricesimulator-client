import getTrendForSymbol from "../controllers/get/getTrendForSymbol"
import binarySearch from "@/utilities/binarySearch"

export default async function calculateIndexForSymbolDay(symbol: string, day: string, indexHint: number = 0) {
  const trend = await getTrendForSymbol(symbol)

  const currentTimestamp = new Date(day).getTime()

  const { timestamps } = trend ?? {}

  let currentPosition: number | undefined

  let isMarketActive = false
  let isMarketOpen = false

  let doSearch = !!(timestamps != null) && !!(timestamps.length > 0)

  if (doSearch === true && timestamps[0] > currentTimestamp) {
    doSearch = false
  }
  if (doSearch === true && timestamps[timestamps.length - 1] < currentTimestamp) {
    doSearch = false
  }

  if (doSearch) {
    if (indexHint == null) {
      currentPosition = binarySearch(timestamps, currentTimestamp)
    } else {
      const indexStart = Math.abs(indexHint)

      const plusOne = timestamps[indexStart + 1]
      const plusTwo = timestamps[indexStart + 2]
      const plusThree = timestamps[indexStart + 3]
      const plusFour = timestamps[indexStart + 4]
      const plusFive = timestamps[indexStart + 5]
      const plusSix = timestamps[indexStart + 6]

      if (currentTimestamp === plusOne) {
        currentPosition = indexStart + 1
      } else if (currentTimestamp === plusTwo) {
        currentPosition = indexStart + 2
      } else if (currentTimestamp === plusThree) {
        currentPosition = indexStart + 3
      } else if (currentTimestamp === plusFour) {
        currentPosition = indexStart + 4
      } else if (currentTimestamp === plusFive) {
        currentPosition = indexStart + 5
      } else if (currentTimestamp === plusSix) {
        currentPosition = indexStart + 6
      } else {
        currentPosition = binarySearch(timestamps, currentTimestamp)
      }
    }

    const timegapDays = trend.timegaps[Math.abs(currentPosition)] / 1000 / 60 / 60 / 24

    isMarketOpen = !!(currentPosition > -1)
    isMarketActive = timegapDays > 0 && timegapDays < 6
  }

  const index = {
    symbol,

    isMarketActive,
    isMarketOpen,

    currentPosition,
    currentTimestamp,
    currentDay: day,
  }

  return index
}
