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
import { Trend } from "@/data/indexDB/types/Trend"

const LOOKBACK = {
  at: 999999,
  "5y": 5 * 52 * 5,
  "1y": 52 * 5,
  "3m": 12 * 5,
  "1m": 4 * 5,
}

type ComponentProps = {
  trend?: Trend
  price?: any
  range?: Range

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HistoryChart({
  trend = {} as Trend,
  price = {},
  range = "1m",

  name = "DatumChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const currentPosition = price?.currentIndex ?? 0

  const lookback = LOOKBACK[range] ?? 30

  const start = currentPosition > lookback ? currentPosition - lookback : 0
  const end = currentPosition

  const timestamps = trend?.timestamps?.slice(start, end) ?? []
  const highs = trend?.highs?.slice(start, end) ?? []
  const lows = trend?.lows?.slice(start, end) ?? []
  // const opens = trend?.opens?.slice(start, end) ?? []
  const closes = trend?.closes?.slice(start, end) ?? []

  if (timestamps == null || timestamps.length === 0 || !Array.isArray(timestamps)) {
    return <div>No Data for </div>
  }

  const labels = timestamps

  const hideClosePoints = labels.length > 30

  const openColor = price.open > closes[timestamps.length - 1] ? cssVar("--outcome-profit") : cssVar("--outcome-loss")

  const datasets = [
    // {
    //   label: "opens",
    //   data: opens,
    //   pointRadius: 0,
    //   borderWidth: 1,
    //   fill: false,
    //   borderColor: openColor,
    //   // borderColor: "#696969",
    //   // tension: 0.3,
    // },

    {
      label: "close",
      data: closes,
      pointRadius: 4,
      borderWidth: 0,
      fill: false,
      pointBackgroundColor: cssVar("--graph-point"),
      // borderColor: "#696969",
      // tension: 0.3,
      hidden: hideClosePoints,
    },
    {
      label: "high",
      data: highs,
      pointRadius: 0,
      borderWidth: 1,
      fill: 2,
      borderColor: cssVar("--graph-range"),
      backgroundColor: cssVar("--graph-range"),
      tension: 0.2,
    },
    {
      label: "low",
      data: lows,
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      borderColor: cssVar("--graph-range"),
      tension: 0.2,
    },
  ]

  const options = {
    animation: false,
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
      },
      y: {
        display: false,
        type: "linear",
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      annotation: {
        annotations: {
          line1: {
            type: "line",
            yMin: price?.open,
            yMax: price?.open,
            borderColor: openColor,
            borderWidth: 1,
            display: !price.marketClosed,
          },
        },
      },
    },
    commonUpdate: true,
  } as any

  return (
    <div {...rest} data-component={name}>
      <div style={{ height: "99%", width: "99%", position: "relative" }}>
        <Line datasetIdKey="id" data={{ labels, datasets }} options={options} />
      </div>
    </div>
  )
}
