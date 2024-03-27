import CurrentDayDisplay from "@/controls/timer/CurrentDayDisplay"
import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link, useMatches } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataHeader({ name = "DataHeader", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const matches = useMatches()

  const marketMatches = matches?.filter((match: any) => match.pathname.includes("/markets"))
  const symbolMatches = marketMatches?.filter((match: any) => match.params?.symbol != null && match.params?.symbol?.length > 0)
  const symbols = symbolMatches?.map((match: any) => match.params?.symbol)

  const showMarkets = marketMatches?.length > 0
  const hasSymbols = symbols?.length > 0

  const symbol = hasSymbols ? symbols?.[0] : null

  const market = useMarketForSymbol(symbol)

  let Markets = null

  if (showMarkets) {
    if (market) {
      Markets = (
        <>
          <Link to="/markets">
            <span className="text-secondary">Markets</span>
          </Link>
          <span>/</span>
          <span className="text-lg text-primary">{market?.name}</span>
        </>
      )
    } else {
      Markets = <span className="text-lg text-primary">Markets</span>
    }
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-between items-center p-2">
        <div className="flex flex-row justify-start items-center p-2 gap-2">
          <Link to="/">
            <img src="/pricesimulator-32.png" alt="Home Page" style={{ height: 32, width: 32 }} />
          </Link>

          {Markets}
        </div>
        <div className="flex-auto">{children}</div>
        <div>
          <CurrentDayDisplay />
        </div>
      </div>
    </div>
  )
}
