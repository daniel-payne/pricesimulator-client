// import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { useEffect, useState } from "react"
import type { Trend } from "../types/Trend"

// import synchronizeAllMarkets from "../actions/synchronizeAllMarkets"

export default function useTrendForSymbol(symbol: string = "MISSING") {
  const [market, setMarket] = useState<Trend | undefined>()

  useEffect(() => {
    db?.trendForSymbol(symbol).then((result) => {
      setMarket(result)
    })
  }, [symbol])

  return market
}
