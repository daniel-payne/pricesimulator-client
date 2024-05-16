import type { HTMLAttributes, PropsWithChildren } from "react"

import useStatus from "@/data/indexDB/hooks/useStatus"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusTrendCountCard({ name = "StatusTrendCountCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const trendCountForSymbol = status?.trendCountForSymbol ?? {}

  const entries = Object.entries(trendCountForSymbol)

  const count = entries.length ?? 0

  return (
    <div {...rest} data-controller={name}>
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-end">
            <span>Loaded Trends : {count}</span>
          </h2>
          <div className="flex flex-row flex-wrap gap-2">
            {entries.map(([symbol, count]) => (
              <div className="w-32 border rounded-lg p-2">
                <span className="text-xs">{symbol}</span>
                <span className="ps-2 text-md">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
