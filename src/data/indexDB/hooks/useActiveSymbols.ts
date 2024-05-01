import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

export default function useActiveSymbols(): Array<string> | undefined {
  const status = useLiveQuery(async () => {
    return await db.status?.limit(1).first()
  })

  const { currentPriceForSymbol = {} } = status ?? {}

  const entries = Object.entries(currentPriceForSymbol).filter((entry) => entry[1] != null)

  return entries?.map((entry) => entry[0]).sort()
}
