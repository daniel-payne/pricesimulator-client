// import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { useEffect, useState } from "react"
import { Market } from "../types/Market"

export default function useMarkets() {
  const [markets, setMarkets] = useState<Array<Market> | undefined>()

  useEffect(() => {
    db?.marketsForApp().then((results) => {
      setMarkets(results)
    })
  }, [])

  return markets
}
