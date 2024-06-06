import { Price } from "@/data/indexDB/types/Price"
import type { HTMLAttributes, PropsWithChildren } from "react"

import { FaArrowTrendUp, FaArrowTrendDown, FaArrowRight, FaMinus } from "react-icons/fa6"

type ComponentProps = {
  price?: Price | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function YesterdayMovementDisplay({ price, name = "YesterdayMovementDisplay", ...rest }: PropsWithChildren<ComponentProps>) {
  const displayValue = (price?.lastOpen ?? 0) - (price?.lastClose ?? 0)

  let displayIcon = null
  let className = ""

  if (displayValue > 0) {
    displayIcon = <FaArrowTrendUp />
    className = "fg-price-info--profit"
  } else if (displayValue < 0) {
    displayIcon = <FaArrowTrendDown />
    className = "fg-price-info--loss"
  } else if (price?.hasIntraDayPrices) {
    displayIcon = <FaArrowRight />
    className = "fg-price-info--no-movement"
  } else {
    displayIcon = <FaMinus />
    className = "fg-price-info--no-movement"
  }

  if (price?.marketClosed) {
    className = "fg-price-info--closed"
  }

  return (
    <div {...rest} data-component={name}>
      <div className={className}>{displayIcon}</div>
    </div>
  )
}
