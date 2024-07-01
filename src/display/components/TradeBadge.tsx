import { Margin } from "@/data/indexDB/types/Margin"
import { Trade } from "@/data/indexDB/types/Trade"

import formatValue from "@/utilities/formatValue"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  trade?: Trade | undefined | null
  margin?: Margin | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TradeBadge({ trade, margin, name = "TradeBadge", ...rest }: PropsWithChildren<ComponentProps>) {
  const isActive = trade?.profit == null

  const value = isActive ? margin?.currentProfit : trade?.profit

  const displayValue = formatValue(Math.abs(value))
  let classNames

  // = isActive ? "rounded px-2 py-1 bg-profit text-sm" : "rounded px-2 py-1 outline-loss text-loss text-sm"

  if (isActive) {
    if (value > 0) {
      classNames = "rounded px-2 py-1 bg-profit text-sm"
    } else if (value < 0) {
      classNames = "rounded px-2 py-1 bg-loss text-sm"
    } else {
      classNames = "rounded px-2 py-1 bg-neutral text-sm"
    }
  } else {
    if (value > 0) {
      classNames = "rounded px-2 py-1 outline-profit text-profit text-sm"
    } else if (value < 0) {
      classNames = "rounded px-2 py-1 outline-loss text-loss text-sm"
    } else {
      classNames = "rounded px-2 py-1 outline-neutral text-neutral text-sm"
    }
  }

  return (
    <div {...rest} data-component={name}>
      <div className={classNames}>
        <span className="font-xs fg--subheading">{trade?.symbol}</span>
        &nbsp;
        {displayValue}
      </div>
    </div>
  )
}
