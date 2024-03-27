import DatumChart from "@/components/DatumChart"
import RangeChooser, { ONE_MONTH } from "@/components/RangeChooser"

import useLivePriceForSymbol from "@/data/computed/hooks/useLivePriceForSymbol"
import useTrendForSymbol from "@/data/indexDB/hooks/useTrendForSymbol"

import { useState, type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketTrend({ symbol, name = "MarketTrend", ...rest }: PropsWithChildren<ComponentProps>) {
  const [range, setRange] = useState(ONE_MONTH)

  // const market = useMarketForSymbol(symbol)

  const trend = useTrendForSymbol(symbol)

  const price = useLivePriceForSymbol(symbol)

  const { currentIndex } = price ?? {}

  const handleRateChange = (value: number) => {
    setRange(value)
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full relative">
        <div className="absolute top-1 left-0 z-10 flex justify-center w-full">
          <RangeChooser defaultValue={range} onRangeChanged={handleRateChange} />
        </div>

        <DatumChart className="h-full w-full" datum={trend} labelName="timestamps" dataNames="highs,lows" currentIndex={currentIndex} range={range} />
      </div>
    </div>
  )
}
