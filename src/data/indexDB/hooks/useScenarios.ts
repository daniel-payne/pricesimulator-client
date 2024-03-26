// import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"
import { useEffect, useState } from "react"
import type { Scenario } from "../types/Scenario"

export default function useMarkets() {
  const [scenarios, setScenarios] = useState<Array<Scenario> | undefined>()

  useEffect(() => {
    db?.scenariosForApp().then((results) => {
      setScenarios(results)
    })
  }, [])

  return scenarios
}
