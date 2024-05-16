import type { HTMLAttributes, PropsWithChildren } from "react"

import useStatus from "@/data/indexDB/hooks/useStatus"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusIndexPositionCard({ name = "StatusIndexPositionCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const currentIndexForSymbol = status?.currentIndexForSymbol ?? {}

  const entries = Object.entries(currentIndexForSymbol)

  const count = entries.length ?? 0

  return (
    <div {...rest} data-controller={name}>
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-end">
            <span>Trend Indexes : {count}</span>
          </h2>
          <div className="flex flex-row flex-wrap gap-2">
            {entries.map(([symbol, data]) => {
              const { currentPosition } = data ?? {}

              return (
                <div className="w-32 border rounded-lg p-2">
                  <span className="text-xs">{symbol}</span>
                  <span className="ps-2 text-md">{currentPosition}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
