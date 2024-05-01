import { useState, type HTMLAttributes, type PropsWithChildren } from "react"

import StatusTest from "@/display/elements/tests/StatusTest"
import ScenariosTest from "@/display/elements/tests/ScenariosTest"
import MarketsTest from "@/display/elements/tests/MarketsTest"
import TrendsTest from "@/display/elements/tests/TrendsTest"
import PricesTest from "@/display/elements/tests/PricesTest"
import IndexesTest from "@/display/elements/tests/IndexesTest"
import CategoriesTest from "@/display/elements/tests/CategoriesTest"
import TradesTest from "@/display/elements/tests/TradesTest"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ request, params }: any) {
  const url = new URL(request.url)
  const search = url.searchParams.toString()

  return { params, search }
}

export default function TestPage({ name = "MarketPage", ...rest }: PropsWithChildren<ComponentProps>) {
  // const data = useLoaderData() as any

  const [index, setIndex] = useState(0)

  let display = null

  if (index === 0) {
    display = <StatusTest />
  } else if (index === 1) {
    display = <ScenariosTest />
  } else if (index === 2) {
    display = <MarketsTest />
  } else if (index === 3) {
    display = <CategoriesTest />
  } else if (index === 4) {
    display = <TrendsTest />
  } else if (index === 5) {
    display = <IndexesTest />
  } else if (index === 6) {
    display = <PricesTest />
  } else if (index === 7) {
    display = <TradesTest />
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full flex flex-col gap-2 p-2">
        <div role="tablist" className="tabs tabs-boxed">
          <a role="Status" className={`tab ${index === 0 ? "tab-active" : ""}`} onClick={() => setIndex(0)}>
            Status
          </a>
          <a role="tab" className={`tab ${index === 1 ? "tab-active" : ""}`} onClick={() => setIndex(1)}>
            Scenario
          </a>
          <a role="tab" className={`tab ${index === 2 ? "tab-active" : ""}`} onClick={() => setIndex(2)}>
            Markets
          </a>
          <a role="tab" className={`tab ${index === 3 ? "tab-active" : ""}`} onClick={() => setIndex(3)}>
            Categories
          </a>
          <a role="tab" className={`tab ${index === 4 ? "tab-active" : ""}`} onClick={() => setIndex(4)}>
            Trends
          </a>
          <a role="tab" className={`tab ${index === 5 ? "tab-active" : ""}`} onClick={() => setIndex(5)}>
            Indexes
          </a>
          <a role="tab" className={`tab ${index === 6 ? "tab-active" : ""}`} onClick={() => setIndex(6)}>
            Prices
          </a>
          <a role="tab" className={`tab ${index === 7 ? "tab-active" : ""}`} onClick={() => setIndex(7)}>
            Trades
          </a>
        </div>
        <div className="flex-auto">{display}</div>
      </div>
    </div>
  )
}
