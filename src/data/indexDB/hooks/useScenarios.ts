import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import compareObjectsBy from "@/utilities/compareObjectsBy"

import type { Scenario } from "@/data/indexDB/types/Scenario"

export default function useScenarios(): Array<Scenario> | undefined {
  const scenarios = useLiveQuery(async () => {
    const data = await db.scenarios?.toArray()

    return data?.sort(compareObjectsBy("displayOrder"))
  })

  return scenarios
}
