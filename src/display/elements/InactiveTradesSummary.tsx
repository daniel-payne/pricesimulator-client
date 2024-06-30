import useInactiveTrades from "@/data/indexDB/hooks/useInactiveTrades"
import type { HTMLAttributes, PropsWithChildren } from "react"
import TradeBadge from "../components/TradeBadge"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function InactiveTradesSummary({ name = "InactiveTradesSummary", ...rest }: PropsWithChildren<ComponentProps>) {
  const trades = useInactiveTrades(true, 5)

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
