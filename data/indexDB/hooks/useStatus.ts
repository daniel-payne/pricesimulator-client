import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import synchronizeAllMarkets from "@/data/indexDB/actions/synchronizeAllMarkets"

export default function useStatus() {
  const result = useLiveQuery(() => db.status.limit(1).first())

  return result
}
