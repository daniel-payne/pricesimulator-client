import type { Market } from "@/data/indexDB/types/Market"
import type { HTMLAttributes, PropsWithChildren } from "react"
import DefaultComponent from "./DefaultComponent"

type ComponentProps = {
  market: Market

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketCard({ market, name = "MarketCard", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="card w-64 h-96 bg-base-300 shadow-xl overflow-hidden">
        <div className="card-body">
          <h4 className="card-title">{market.name}</h4>
          <p>{market.description}</p>
          <DefaultComponent name="PriceSummary" className="h-full">
            <div className="h-full flex flex-col">
              <DefaultComponent name="PriceSparkline" className="h-24" />
              <DefaultComponent name="PriceLatest" className="h-8" />
            </div>
          </DefaultComponent>
          <div className="card-actions justify-end">
            <button className="btn btn-sm w-20 btn-primary" onClick={() => alert(JSON.stringify(market, null, 2))}>
              Buy
            </button>
            <button className="btn btn-sm w-20 btn-secondary">Sell</button>
            <button className="btn btn-sm w-20 btn-secondary">Put</button>
            <button className="btn btn-sm w-20 btn-secondary">Call</button>
          </div>
        </div>
      </div>
    </div>
  )
}
