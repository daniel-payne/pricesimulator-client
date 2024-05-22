import useStatus from "@/data/indexDB/hooks/useStatus"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusPage({ name = "StatusPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const status = useStatus()

  const trendCounts = status?.trendCountForSymbol ?? {}
  const currentIndexes = status?.currentIndexForSymbol ?? {}

  return (
    <div {...rest} data-component={name}>
      <div className="p-6">{name}</div>
      {/* <pre>{JSON.stringify(status, null, 2)}</pre> */}
      {status?.id}
      <h4>CTrend Counts</h4>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(trendCounts).map(([key, value]) => {
          return (
            <div className="border rounded p-2" key={key}>
              <p>{key}</p>
              <p>{value}</p>
            </div>
          )
        })}
      </div>
      <h4>Current Indexes</h4>
      <div className="flex flex-row flex-wrap gap-2">
        {Object.entries(currentIndexes).map(([key, value]) => {
          return (
            <div className="border rounded p-2" key={key}>
              <p>{key}</p>
              <p>
                <span className="pe-2">{value?.currentPosition ?? "NONE"}</span>
                <span className="pe-2">{value?.isMarketActive ? "ACTIVE" : "inactive"}</span>
                <span className="pe-2">{value?.isMarketOpen ? "OPEN" : "closed"}</span>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
