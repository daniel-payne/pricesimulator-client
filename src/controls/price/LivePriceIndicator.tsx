import type { HTMLAttributes, PropsWithChildren } from "react"

import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useLivePriceForSymbol from "@/data/computed/hooks/useLivePriceForSymbol"

type ComponentProps = {
  symbol: string | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function LatestPriceIndicator({ symbol, name = "LatestPriceIndicator", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)
  const price = useLivePriceForSymbol(symbol)

  const decimalPlaces = market?.decimalPlaces ? parseInt(market.decimalPlaces) : 4
  const displayPrice = price?.marketClosed === true ? price?.lastClose : price?.midDayPrice

  let formattedPrice: any = displayPrice

  if (displayPrice != null) {
    formattedPrice = new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    }).format(displayPrice)
  }

  const formattedClassName = price?.marketClosed === true ? "text-gray-400" : "text-primary"

  return (
    <div {...rest} data-component={name}>
      <div className={formattedClassName}>{formattedPrice}</div>
    </div>
  )
}
