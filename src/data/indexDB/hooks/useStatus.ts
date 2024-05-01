import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Status } from "@/data/indexDB/types/Status"

export default function useStatus(): Status | undefined {
  const status = useLiveQuery(async () => {
    return await db.status?.limit(1).first()
  })

  return status
}
