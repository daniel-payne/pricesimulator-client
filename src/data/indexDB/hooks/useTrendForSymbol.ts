import { useEffect, useState } from "react"

import getTrendForSymbol from "@/data/indexDB/controllers/get/getTrendForSymbol"

import type { Trend } from "@/data/indexDB/types/Trend"

export default function useTrendForSymbol(symbol: string | undefined): Trend | undefined {
  const [trend, setTrend] = useState<Trend | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      if (symbol != null) {
        const data = await getTrendForSymbol(symbol)

        setTrend(data)
      }
    }

    fetchData().catch(console.error)
  }, [symbol])

  return trend
}
