import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import useMarkets from "@/data/indexDB/hooks/useMarkets"

import { Children, cloneElement, useState, type HTMLAttributes, type PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsData({ name = "MarketsData", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const [show, setShow] = useState(false)
  const markets = useMarkets()

  // const child = Children?.toArray(children)[0] as any

  if ((markets?.length ?? 0) < 1) {
    return <div>Loading Markets</div>
  }

  return (
    <div {...rest} data-controller={name}>
      <h1 className="text-lg m-2 font-bold">
        {name} &nbsp;
        <button className="btn btn-xs btn-primary" onClick={() => setShow(!show)}>
          {show ? "Hide JSON" : "Show as JSON"}
        </button>
      </h1>

      {/* <pre className="border border-primary m-2 p-2">{JSON.stringify(scenarios, null, 2)}</pre> */}

      <div className="flex-auto flex flex-row flex-wrap gap-2 justify-start items-center p-2 ">
        {markets?.map((market) => (
          <ItemData symbol={market.symbol} key={market.symbol} showAsJson={show}>
            {children}
          </ItemData>
        ))}
      </div>
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const ItemData = ({ symbol, children, showAsJson = false }: { symbol: string; children?: any; showAsJson: boolean }) => {
  const market = useMarketForSymbol(symbol)
  const price = useCurrentPriceForSymbol(symbol)

  const array = Children.toArray(children)

  const newChildren = array.map((child: any) => {
    return cloneElement(child, { market, price })
  })

  return (
    <div className="p-2 border border-primary rounded-lg">
      {showAsJson === true && (
        <div>
          <pre>{JSON.stringify(market, null, 2)}</pre>
          <pre>{JSON.stringify(price, null, 2)}</pre>
        </div>
      )}
      {showAsJson === false && newChildren}
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
