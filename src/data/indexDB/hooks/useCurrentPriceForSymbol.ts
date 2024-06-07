import { useEffect } from "react"

import type { Price } from "../types/Price"

import useDatumForSymbol from "./useDatumForSymbol"
import useTimer from "./useTimer"
import { useSharedState } from "@keldan-systems/state-mutex"

import calculateIndexForTimestamp from "@/data/indexDB/calculate/calculateIndexForTimestamp"
import calculatePriceForIndex from "../calculate/calculatePriceForIndex"

export default function useCurrentPriceForSymbol(symbol: string): Price | null | undefined {
  const [index, setIndex] = useSharedState<number | undefined>(`current-index-${symbol}`, undefined)
  const [price, setPrice] = useSharedState<Price | null | undefined>(`current-price-${symbol}`, undefined)

  const datum = useDatumForSymbol(symbol)
  const timer = useTimer()

  useEffect(() => {
    const run = async () => {
      if (timer?.currentTimestamp != null && datum?.timestamps?.values != null) {
        const newIndex = await calculateIndexForTimestamp(datum.timestamps.values, timer.currentTimestamp, index)

        setIndex(newIndex)
      }
    }
    run()
  }, [timer, datum, index, setIndex])

  useEffect(
    () => {
      const run = async () => {
        if (timer?.currentTimestamp != null && datum?.timestamps?.values != null) {
          const newPrice = await calculatePriceForIndex(
            symbol,
            datum?.timestamps?.values,
            datum?.opens?.values,
            datum?.highs?.values,
            datum?.lows?.values,
            datum?.closes?.values,
            index
          )

          setPrice(newPrice)
        }
      }
      run()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index]
  )

  // let price

  // const currentPriceForSymbol = status?.currentPriceForSymbol ?? {}

  // const entry = Object.entries(currentPriceForSymbol).find(([match]) => match === symbol)

  // if (entry != null && entry[1] != null) {
  //   price = entry[1]
  // } else {
  //   getTrendForSymbol(symbol)
  // }

  return price
}
