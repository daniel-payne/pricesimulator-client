// import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { useEffect, useState } from "react"
import { Market } from "../types/Market"

// import synchronizeAllMarkets from "../actions/synchronizeAllMarkets"

export default function useMarketForSymbol(symbol: string = "MISSING") {
  const [market, setMarket] = useState<Market | undefined>()

  useEffect(() => {
    db?.marketForSymbol(symbol).then((result) => {
      setMarket(result)
    })
  }, [symbol])

  return market
}
