import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import synchronizeAllMarkets from "@/data/indexDB/actions/synchronizeAllMarkets"

export default function useMarkets() {
  const result = useLiveQuery(() => db.markets.toArray())

  if (result == null) {
    synchronizeAllMarkets()
  }

  return result
}
