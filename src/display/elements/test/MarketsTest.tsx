// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
// import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"

import useMarkets from "@/data/indexDB/hooks/useMarkets"
import FlowLayout from "@/display/components/layouts/FlowLayout"
// import { useDataState } from "@keldan-systems/state-mutex"

import { Children, cloneElement, useState, type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentProps = {
  addBorder?: boolean | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsTest({ addBorder = false, name = "MarketsTest", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const [showAsJSON, setShowAsJSON] = useState(false)

  // const width = useDataState<string>("width")
  // const height = useDataState<string>("height")

  const markets = useMarkets()

  // const layoutClassName = "w-" + (width ?? "auto") + " h-" + (height ?? "auto")

  if ((markets?.length ?? 0) < 1) {
    return <div>Loading Markets</div>
  }

  return (
    <div {...rest} data-controller={name}>
      <div className="h-auto flex flex-col">
        <h1 className="text-lg m-2 font-bold">
          {name} &nbsp;
          <button className="btn btn-xs btn-primary" onClick={() => setShowAsJSON(!showAsJSON)}>
            {showAsJSON ? "Hide JSON" : "Show as JSON"}
          </button>
        </h1>

        <FlowLayout className="flex-auto" addBorder={addBorder}>
          {markets?.map((market) => (
            <ApplyMarketToEachChild market={market} showAsJson={showAsJSON}>
              {children}
            </ApplyMarketToEachChild>
          ))}
        </FlowLayout>
      </div>
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ApplyMarketToEachChild = ({ market, children, showAsJson = false }: { market: any; children?: any; showAsJson: boolean }) => {
  const price = useCurrentPriceForSymbol(market.symbol)

  const array = Children.toArray(children)

  const newChildren = array.map((child: any) => {
    const key = market.symbol

    return cloneElement(child, { market, price, key })
  })

  return (
    <>
      {showAsJson === true && (
        <div className="overflow-hidden" key={market.symbol}>
          <pre>{JSON.stringify(market, null, 2)}</pre>
          <pre>{JSON.stringify(price, null, 2)}</pre>
        </div>
      )}
      {showAsJson === false && newChildren}
    </>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
