import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Scenario } from "@/data/indexDB/types/Scenario"

export default function useScenarios(): Array<Scenario> | undefined {
  const scenarios = useLiveQuery(async () => {
    return await db.scenarios?.toArray()
  })

  return scenarios
}
