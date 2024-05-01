import StatusCurrentPricesListing from "@/display/elements/listing/StatusCurrentPricesListing"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function PricesPage({ name = "PricesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full ">
        <StatusCurrentPricesListing />
      </div>
    </div>
  )
}
