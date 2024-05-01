import type { Trend } from "@/data/indexDB/types/Trend"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  trend: Trend
  currentIndex?: number

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TrendCard({ trend, currentIndex, name = "TrendCard", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="card w-64 h-36 bg-base-300 shadow-xl overflow-hidden">
        <div className="card-body">
          <h4 className="card-title">{trend.symbol}</h4>
          currentIndex : {currentIndex}
          <pre>{JSON.stringify(trend.timestamps.length, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
