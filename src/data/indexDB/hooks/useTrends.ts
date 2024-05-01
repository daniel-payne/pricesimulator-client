import { useEffect, useState } from "react"

import { useLiveQuery } from "dexie-react-hooks"

import db from "@/data/indexDB/db"

import type { Trend } from "@/data/indexDB/types/Trend"

export default function useTrends(): Array<Trend> | undefined {
  const cache = db?.trendsCache != null ? (Object.values(db.trendsCache).filter((item) => item != null) as Array<Trend>) : []

  const [trends, setTrends] = useState<Array<Trend> | undefined>(cache)

  const markets = useLiveQuery(async () => {
    return await db.markets?.toArray()
  })

  useEffect(() => {
    const newCache = db?.trendsCache != null ? (Object.values(db.trendsCache).filter((item) => item != null) as Array<Trend>) : []

    setTrends(newCache)
  }, [markets])

  return trends
}
