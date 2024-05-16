import type { HTMLAttributes, PropsWithChildren } from "react"

import useStatus from "@/data/indexDB/hooks/useStatus"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

function formatPrice(value: number | null | undefined) {
  if (value == null) {
    return null
  }
  return value.toFixed(2)
}

export default function StatusCurrentPricesCard({ name = "StatusCurrentPricesCard", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const currentPriceForSymbol = status?.currentPriceForSymbol ?? {}

  const entries = Object.entries(currentPriceForSymbol)

  const count = entries.length ?? 0

  return (
    <div {...rest} data-controller={name}>
      <div className="card w-full bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-end">
            <span>Current Prices : {count}</span>
          </h2>
          <div className="flex flex-row flex-wrap gap-2">
            {entries.map(([symbol, data]) => {
              const { bid, offer } = data ?? {}

              return (
                <div className="w-40 border rounded-lg p-2">
                  <span className="text-xs">{symbol}</span>
                  <span className="ps-2 text-sm">{formatPrice(bid)}</span>
                  <span className="ps-2 text-sm">{formatPrice(offer)}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
