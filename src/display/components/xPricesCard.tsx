import type { Price } from "@/data/indexDB/types/Price"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  price: Price
  currentIndex?: number

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TrendCard({ price, name = "TrendCard", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="card w-64 h-36 bg-base-300 shadow-xl overflow-hidden">
        <div className="card-body">
          <h4 className="card-title">{price.symbol}</h4>

          <pre>{JSON.stringify(price, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
