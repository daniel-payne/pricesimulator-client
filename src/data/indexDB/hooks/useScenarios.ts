import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Scenario } from "@/data/indexDB/types/Scenario"
import { useEffect } from "react"

import getScenarios from "../controllers/get/getScenarios"
import compareObjectsBy from "@/utilities/compareObjectsBy"

export default function useTimer(): Array<Scenario> | undefined {
  const scenarios = useLiveQuery(async () => {
    return await db.scenarios?.toArray()
  })

  useEffect(() => {
    if ((scenarios?.length ?? 0) < 1) {
      getScenarios()
    }
  }, [scenarios])

  scenarios?.sort(compareObjectsBy("displayOrder"))

  return scenarios
}
