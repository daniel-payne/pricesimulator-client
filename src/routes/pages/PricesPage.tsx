// import timerNextDay from "@/data/indexDB/controllers/timer/timerNextDay"
// import timerReset from "@/data/indexDB/controllers/timer/timerReset"
// import timerStart from "@/data/indexDB/controllers/timer/timerStart"
// import timerStop from "@/data/indexDB/controllers/timer/timerStop"
// import { ScenarioSpeed } from "@/data/indexDB/enums/ScenarioSpeed"
// import useStatus from "@/data/indexDB/hooks/useStatus"

// import useCurrentPriceForSymbol from "@/data/indexDB/hooks/useCurrentPriceForSymbol"
import useDatumForSymbol from "@/data/indexDB/hooks/useDatumForSymbol"
import formatNumber from "@/utilities/formatNumber"
import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { useLoaderData, useParams, useSearchParams } from "react-router-dom"
import AutoSizer from "react-virtualized-auto-sizer"
import { FixedSizeGrid as Grid } from "react-window"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

const Cell = ({ data, columnIndex, rowIndex, style }: { data: any; columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
  let display: string | number = ""

  if (columnIndex === 0) {
    display = formatTimestampDay(data?.timestamps.values[rowIndex]) + " " + formatTimestamp(data?.timestamps.values[rowIndex])
  } else if (columnIndex === 1) {
    display = formatNumber(data?.opens.values[rowIndex])
  } else if (columnIndex === 2) {
    display = formatNumber(data?.highs.values[rowIndex])
  } else if (columnIndex === 3) {
    display = formatNumber(data?.lows.values[rowIndex])
  } else if (columnIndex === 4) {
    display = formatNumber(data?.closes.values[rowIndex])
  }

  return <div style={style}>{display}</div>
}

export default function PricesPage({ name = "PricesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  // const { params } = useLoaderData() as any
  const { symbol } = useParams()

  // const symbol = params.get("symbol") ?? ""

  const datum = useDatumForSymbol(symbol)

  // const { timestamps, opens, highs, lows, closes } = datum ?? {}

  // const itemData = [timestamps, opens, highs, lows, closes]
  // const price = useCurrentPriceForSymbol(symbol)

  return (
    <div {...rest} data-component={name}>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            className="List"
            itemData={datum ?? {}}
            height={height}
            // rowCount={(price?.currentIndex ?? -1) + 1}
            rowCount={datum?.timestamps?.values.length ?? 0}
            columnCount={5}
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
