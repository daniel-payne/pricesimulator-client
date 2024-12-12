import { useLiveQuery } from "dexie-react-hooks"
import db from "../db"
import consoleInfo from "@/utilities/consoleInfo"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function useHighsFor(symbol = "MISSING") {
  const data = useLiveQuery(async () => {
    const cached = db.highsCache[symbol]

    if ((cached?.length ?? 0) > 0) {
      consoleInfo(`useHighsFor ${symbol} : cached`)
      return cached
    }

    const stored = await db.highs.where({ symbol }).first()

    db.highsCache[symbol] = stored?.data

    consoleInfo(`useHighsFor ${symbol} : stored`)
    return stored?.data
  }, [symbol])

  return data
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
