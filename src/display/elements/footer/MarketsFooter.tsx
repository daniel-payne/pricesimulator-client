import type { HTMLAttributes, PropsWithChildren } from "react"

import ActiveTradesSummary from "../ActiveTradesSummary"
import InactiveTradesSummary from "../InactiveTradesSummary"
import AccountSummary from "../AccountSummary"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsFooter({ name = "MarketsFooter", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <ActiveTradesSummary />
        <InactiveTradesSummary />
        <AccountSummary />
      </div>
    </div>
  )
}
