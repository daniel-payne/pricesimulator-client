"use client"

import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"

import { Line } from "react-chartjs-2"

// import { useWindowSize } from "react-use"
//
import "chartjs-adapter-date-fns"

Chart.register([annotationPlugin])

// const MILLISECONDS = 24 * 60 * 60 * 1000

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Range } from "@/display/components/HistoryRangeChooser"

import cssVar from "@/utilities/cssVar"
import { Data } from "@/data/indexDB/types/Data"
import { Status } from "@/data/indexDB/types/Status"
import { Timer } from "@/data/indexDB/types/Timer"
import { Price } from "@/data/indexDB/types/Price"
import addTimestamp from "@/utilities/addTimestamp"
import formatTimestampISO from "@/utilities/formatTimestampISO"
// import { startOfMonth } from "date-fns"

// const LOOKBACK = {
//   at: 999999,
//   "5y": 5 * 52 * 5,
//   "1y": 52 * 5,
//   "3m": 12 * 5,
//   "1m": 4 * 5,
// }

type ComponentProps = {
  timestamp: number | null | undefined
  data?: Data | null | undefined
  price?: Price | null | undefined
  range?: Range | null | undefined
  status?: Status | null | undefined
  timer?: Timer | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HighLowChart({
  timestamp,
  data,
  price,
  status,

  range = "1m",

  name = "HighLowChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  if (data == null || data?.timestamps == null || timestamp == null) {
    const message = status?.message ?? ""

    return <div>{message.length === 0 ? "Awaiting Data" : message}</div>
  }

  if (price == null) {
    const message = status?.message ?? ""

    return <div>{message.length === 0 ? "Awaiting Prices" : message}</div>
  }

  const isMarketClosed = price?.isMarketClosed

  const currentTimestamp = price?.currentTimestamp
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

  const startISO = range === "at" ? "1970-01-01" : formatTimestampISO(addTimestamp(timestamp, priorAmount, priorPeriod, false))
  const endISO = formatTimestampISO(addTimestamp(timestamp, +1, "days", false))
  // const currentISO = formatTimestampISO(currentTimestamp)

  const pricePointValue = isMarketClosed ? priorClose : currentOpen
  const pricePointISO = isMarketClosed ? formatTimestampISO(priorTimestamp) : formatTimestampISO(currentTimestamp)
  const pricePointColor = isMarketClosed
    ? (priorClose ?? 0) > (priorOpen ?? 0)
      ? cssVar("--outcome-profit")
      : cssVar("--outcome-loss")
    : (currentOpen ?? 0) > (priorClose ?? 0)
    ? cssVar("--outcome-profit")
    : cssVar("--outcome-loss")

  const datasets = [
    {
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
        display: true,
        type: "linear",
        position: "right",
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
        <Line datasetIdKey="id" data={{ labels: labels, datasets }} options={options} />
      </div>
    </div>
  )
}
