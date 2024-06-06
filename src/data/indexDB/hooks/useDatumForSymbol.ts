import type { Data } from "@/data/indexDB/types/Data"
import { useEffect } from "react"

import getDataForSymbol from "../controllers/get/getDataForSymbol"
import { useSharedState } from "@keldan-systems/state-mutex"

type Datum = {
  timestamps: Data | undefined
  opens: Data | undefined
  highs: Data | undefined
  lows: Data | undefined
  closes: Data | undefined
}

export default function useDatumForSymbol(symbol: string | undefined): Datum | undefined {
  const [timestamps, setTimestamps] = useSharedState<Data | undefined>(`timestamps-${symbol}`, undefined)
  const [opens, setOpens] = useSharedState<Data | undefined>(`opens-${symbol}`, undefined)
  const [highs, setHighs] = useSharedState<Data | undefined>(`highs-${symbol}`, undefined)
  const [lows, setLows] = useSharedState<Data | undefined>(`lows-${symbol}`, undefined)
  const [closes, setCloses] = useSharedState<Data | undefined>(`closes-${symbol}`, undefined)

  useEffect(() => {
    const run = async () => {
      const data = await getDataForSymbol(symbol)

      if (data?.timestamps != null) {
        setTimestamps(data.timestamps)
      }

      if (data?.opens != null) {
        setOpens(data.opens)
      }

      if (data?.highs != null) {
        setHighs(data.highs)
      }

      if (data?.lows != null) {
        setLows(data.lows)
      }

      if (data?.closes != null) {
        setCloses(data.closes)
      }
    }

    if ((timestamps?.values.length ?? 0) < 1) {
      run()
    }
  }, [setCloses, setHighs, setLows, setOpens, setTimestamps, symbol, timestamps])

  return { timestamps, opens, highs, lows, closes }
}
