import MarketDetail from "@/display/elements/MarketDetail"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketPage({ name = "MarketPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full p-6">
        <MarketDetail className="h-full w-full" symbol={"CT.F"} />
      </div>
    </div>
  )
}
