import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  symbol: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function QuoteManager({ symbol, name = "QuoteManager", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-controller={name}>
      <div className="text-info p-2 text-lg font-bold">Instruction to Broker </div>

      <div className="text-center p-2">
        <div>For</div>
        <div className="flex flex-row gap-2 justify-center items-center">
          <button className="btn btn-secondary ">Half</button>
          <button className="btn btn-secondary ">One</button>
        </div>
        <div>Contract for 18 Cows, to be delivered on 23 June</div>
        <div>That was trading yesterday for</div>
        <div>$23,443</div>
        <div>As soon as the market opens tomorrow</div>
      </div>
      <div className="flex flex-row gap-2 justify-center items-center">
        {/* <div>Request a quote to</div> */}
        <button className="btn btn-buy ">Buy</button>
        {/* <button className="btn btn-primary ">Option Only</button> */}
        <button className="btn btn-sell ">Sell</button>
      </div>
    </div>
  )
}
