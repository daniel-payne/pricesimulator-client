import { Price } from "@/data/indexDB/types/Price"
import formatNumber from "@/utilities/formatNumber"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type ComponentProps = {
  price?: Price | null | undefined
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CurrentOpenDisplay({ price, name = "CurrentOpenDisplay", ...rest }: PropsWithChildren<ComponentProps>) {
  const displayValue = price?.marketClosed ? price?.lastClose : price?.midDayPrice

  if (displayValue == null) {
    return null
  }

  const overnightMovement = (price?.open ?? 0) - (price?.lastClose ?? 0)

  let displayClasses

  if (price?.marketClosed) {
    displayClasses = "fg-price-info--closed"
  } else {
    if (overnightMovement > 0) {
      displayClasses = "fg-price-info--profit"
    } else if (overnightMovement < 0) {
      displayClasses = "fg-price-info--loss"
    } else {
      displayClasses = "fg-price-info--no-movement"
    }
  }

  return (
    <div {...rest} data-component={name}>
      <Link to={`/prices/${price?.symbol}`} target="_blank">
        <div className={displayClasses}>{formatNumber(displayValue)}</div>
      </Link>
    </div>
  )
}
