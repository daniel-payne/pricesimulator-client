import db from "@/data/indexDB/db"
import { Price } from "@/data/indexDB/types/Price"
import useTimer from "@/data/localStorage/hooks/useTimer"
import { useEffect, useState } from "react"

export default function useLivePriceForSymbol(symbol: string = "MISSING") {
  const [price, setPrice] = useState<Price | undefined>()

  const { data: timerData } = useTimer()

  const { currentDay } = timerData

  useEffect(
    () => {
      if (currentDay) {
        db.priceForSymbolAndDay(symbol, currentDay).then((newPrice) => {
          if (newPrice) {
            setPrice(newPrice)
          }
        })
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentDay]
  )

  return price
}
