import { useLiveQuery } from "dexie-react-hooks"
import db from "../db"
import consoleInfo from "@/utilities/consoleInfo"

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function useRatesFor(code = "MISSING") {
  const data = useLiveQuery(async () => {
    const cached = db.ratesCache[code]

    if ((cached?.length ?? 0) > 0) {
      consoleInfo(`useOpensFor ${code} : cached`)
      return cached
    }

    const stored = await db.rates.where({ code }).first()

    db.ratesCache[code] = stored?.data

    consoleInfo(`useOpensFor ${code} : stored`)
    return stored?.data
  }, [code])

  return data
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
