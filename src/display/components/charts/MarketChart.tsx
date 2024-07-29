import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"

import { Chart as Multi } from "react-chartjs-2"

import "chartjs-adapter-date-fns"

Chart.register([annotationPlugin])

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Range } from "@/display/components/choosers/RangeChooser"

import cssVar from "@/utilities/cssVar"
import { Data } from "@/data/indexDB/types/Data"

import { Price } from "@/data/indexDB/types/Price"
import addTimestamp from "@/utilities/addTimestamp"
import formatTimestampISO from "@/utilities/formatTimestampISO"

type ComponentProps = {
  data?: Data | null | undefined
  price?: Price | null | undefined

  range?: Range | null | undefined
  showYScale: boolean | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketChart({
  data,
  price,

  range = "1m",
  showYScale = false,

  name = "MarketChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  if (data == null) {
    return <div>Awaiting Data</div>
  }

  if (price == null) {
    return <div>Awaiting Prices</div>
  }

  const isMarketClosed = price?.isMarketClosed

  const currentTimestamp = price?.currentTimestamp ?? price?.priorTimestamp
  const currentIndex = price?.currentIndex
  const currentOpen = price?.currentOpen

  const priorIndex = price?.priorIndex
  const priorTimestamp = price?.priorTimestamp
  const priorOpen = price?.priorOpen
  const priorClose = price?.priorClose

  // const lookback = LOOKBACK[range ?? "1m"] ?? 30

  // const start = currentPosition > lookback ? currentPosition - lookback : 0
  const end = currentIndex ?? (priorIndex ?? 0) + 1

  if (end == null) {
    return <div>Error : No End</div>
  }

  const highs = data?.highs?.slice(0, end) ?? []
  const lows = data?.lows?.slice(0, end) ?? []

  const labels = data?.timestamps?.slice(0, end) ?? []

  let priorAmount = -1
  let priorPeriod = "days" as "days" | "weeks" | "months" | "years"

  if (range === "1m") {
    priorAmount = -1
    priorPeriod = "months"
  } else if (range === "3m") {
    priorAmount = -3
    priorPeriod = "months"
  } else if (range === "1y") {
    priorAmount = -1
    priorPeriod = "years"
  } else if (range === "5y") {
    priorAmount = -5
    priorPeriod = "years"
  }

  const startISO = range === "at" ? "1970-01-01" : formatTimestampISO(addTimestamp(currentTimestamp, priorAmount, priorPeriod, false))
  const endISO = formatTimestampISO(addTimestamp(currentTimestamp, +1, "days", false))

  const pricePointValue = isMarketClosed ? priorClose : currentOpen
  const pricePointISO = isMarketClosed ? formatTimestampISO(priorTimestamp) : formatTimestampISO(currentTimestamp)
  const pricePointColor = isMarketClosed
    ? (priorClose ?? 0) > (priorOpen ?? 0)
      ? cssVar("--outcome-profit")
      : cssVar("--outcome-loss")
    : (currentOpen ?? 0) > (priorClose ?? 0)
    ? cssVar("--outcome-profit")
    : cssVar("--outcome-loss")

  const datasets: any = [
    {
      type: "line",
      label: "high",
      data: highs,
      pointRadius: 0,
      borderWidth: 1,
      fill: 1,
      borderColor: cssVar("--graph-range"),
      backgroundColor: cssVar("--graph-range"),
      tension: 0.2,
      spanGaps: true,
    },
    {
      type: "line",
      label: "low",
      data: lows,
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      borderColor: cssVar("--graph-range"),
      tension: 0.2,
      spanGaps: true,
    },
  ]

  const options = {
    animations: false,
    maintainAspectRatio: false,
    scales: {
      x: {
        display: false,
        type: "time",
        parsing: false,
        time: {
          displayFormats: {
            unit: "day",
            day: "E dd MMM",
          },
        },
        min: startISO,
        max: endISO,
      },
      y: {
        display: showYScale,
        type: "linear",
        position: "right",
        beginAtZero: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          priceLine: {
            type: "line",
            yMin: pricePointValue,
            yMax: pricePointValue,
            borderColor: pricePointColor,
            borderWidth: 1,
            display: true,
          },
          pricePoint: {
            type: "point",
            radius: 6,
            yValue: pricePointValue,
            xValue: pricePointISO,
            borderColor: pricePointColor,
            backgroundColor: pricePointColor,
            borderWidth: 1,
            display: true,
          },
        },
      },
    },
    commonUpdate: true,
  } as any

  return (
    <div {...rest} data-component={name}>
      <div style={{ height: "99%", width: "99%", position: "relative" }}>
        <Multi datasetIdKey="id" type="line" data={{ labels: labels, datasets }} options={options} />
      </div>
    </div>
  )
}
