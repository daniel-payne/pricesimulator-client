import ValueChooser from "@/components/ValueChooser"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
// import { Market } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

const tradeOptions = [
  { value: "CALL", label: "Buy" },
  { value: "PUT", label: "Sell" },
]

const sizeOptions = [
  // { value: "EIGHT", label: "An eighth" },
  // { value: "QUARTER", label: "A quarter" },
  // { value: "THIRD", label: "A third" },
  // { value: "HALF", label: "Half" },
  { value: "ONE", label: "One" },
  // { value: "TWO", label: "Two" },
  // { value: "THREE", label: "Three" },
]

export default function ContractQuote({ symbol, name = "ContractQuote", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(symbol)

  return (
    <div {...rest} data-component={name} style={{ border: "1px solid grey", padding: 2 }}>
      <div className="p-2 flex flex-row items-baseline gap-2">
        <ValueChooser options={tradeOptions} />

        <ValueChooser options={sizeOptions} />
        <div className="text-xs">contract for a</div>
        <div className="text-primary border border-primary rounded-lg py-1 px-2">{market?.contractName}</div>
        <div className="text-xs">for Delivery on last day of</div>
        <div className="text-primary border border-primary rounded-lg py-1 px-2">30 April 2007</div>
        <div className="text-xs">in 95 days time</div>
        <div className="text-xs">for</div>
        <div className="text-primary border border-primary rounded-lg py-1 px-2">$12,345</div>

        {/* <div className="join">
          <button className="btn join-item">Stop Loses at</button>
          <input type="text" placeholder="$" className="input input-bordered max-w-xs w-24" />
        </div> */}
        {/* <div className="join">
          <button className="btn join-item text-primary">Take Profit at</button>
          <input type="text" placeholder="$" className="input input-bordered max-w-xs w-24" />
        </div> */}
      </div>
    </div>
  )
}
