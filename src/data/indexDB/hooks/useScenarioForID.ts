// import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { useEffect, useState } from "react"
import { Scenario } from "../types/Scenario"

// import synchronizeAllMarkets from "../actions/synchronizeAllMarkets"

export default function useMarketForSymbol(id: string = "MISSING") {
  const [scenario, setScenario] = useState<Scenario | undefined>()

  useEffect(() => {
    db?.scenarioForId(id).then((result) => {
      setScenario(result)
    })
  }, [id])

  return scenario
}
