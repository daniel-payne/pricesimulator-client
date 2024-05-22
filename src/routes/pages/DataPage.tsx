// import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
// import timerReset from "@/data/indexDB/controllers/timer/timerReset"
// import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import timerStop from "@/data/indexDB/controllers/timer/timerStop"
// import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"
// import useStatus from "@/data/indexDB/hooks/useStatus"

import useTrendForSymbol from "@/data/indexDB/hooks/useTrendForSymbol"
import formatNumber from "@/utilities/formatNumber"
import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { useLoaderData } from "react-router-dom"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeGrid as Grid } from "react-window"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ request, params }: any) {
  const url = new URL(request.url)
  const search = url.searchParams.toString()

  return { search, params }
}

const Cell = ({ data, columnIndex, rowIndex, style }: { data: any; columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
  let display: string | number = ""

  if (columnIndex === 0) {
    display = formatTimestampDay(data?.timestamps[rowIndex]) + " " + formatTimestamp(data?.timestamps[rowIndex])
  } else if (columnIndex === 1) {
    display = formatNumber(data?.opens[rowIndex])
  } else if (columnIndex === 2) {
    display = formatNumber(data?.highs[rowIndex])
  } else if (columnIndex === 3) {
    display = formatNumber(data?.lows[rowIndex])
  } else if (columnIndex === 4) {
    display = formatNumber(data?.closes[rowIndex])
  } else if (columnIndex === 5) {
    display = (data?.timegaps[rowIndex] ?? 0) / 1000 / 60 / 60 / 24
  }

  return <div style={style}>{display}</div>
}

export default function DataPage({ name = "DataPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const { params } = useLoaderData() as any

  const { symbol } = params

  const trend = useTrendForSymbol(symbol)

  return (
    <div {...rest} data-component={name}>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            className="List"
            itemData={trend}
            height={height}
            rowCount={trend?.timestamps.length || 0}
            columnCount={6}
            rowHeight={35}
            columnWidth={200}
            width={width}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  )
}
