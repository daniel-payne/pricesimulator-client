import StatusCurrentPricesCard from "@/display/elements/card/StatusCurrentPricesCard"
import StatusIndexPositionCard from "@/display/elements/card/StatusIndexPositionCard"
import StatusSummaryCard from "@/display/elements/card/StatusSummaryCard"
import StatusTrendCountCard from "@/display/elements/card/StatusTrendCountCard"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataPage({ name = "DataPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full ">
        <div className="flex flex-col gap-2 p-2">
          <StatusSummaryCard />
          <StatusTrendCountCard />
          <StatusIndexPositionCard />
          <StatusCurrentPricesCard />
        </div>
      </div>
    </div>
  )
}
