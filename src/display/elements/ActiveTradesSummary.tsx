import useTrades, { TradeStatus } from "@/data/indexDB/hooks/useTrades"
import type { HTMLAttributes, PropsWithChildren } from "react"
import TradeBadge from "../components/TradeBadge"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ActiveTradesSummary({ name = "ActiveTradesSummary", ...rest }: PropsWithChildren<ComponentProps>) {
  const trades = useTrades(TradeStatus.OPEN)

  return (
    <div {...rest} data-controller={name}>
      <div className="ps-2 flex flex-row gap-2 items-baseline">
        {trades?.map((trade) => (
          <TradeBadge trade={trade} key={trade.id} />
        ))}
      </div>
    </div>
  )
}
