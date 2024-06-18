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

const LOOKBACK = {
  at: 999999,
  "5y": 5 * 52 * 5,
  "1y": 52 * 5,
  "3m": 12 * 5,
  "1m": 4 * 5,
}

type ComponentProps = {
  data?: Data | null | undefined
  price?: Price | null | undefined
  range?: Range | null | undefined
  status?: Status | null | undefined
  timer?: Timer | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HistoryChart({
  data,
  price,
  status,

  range = "1m",

  name = "HistoryChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  if (data == null || data?.timestamps == null) {
    const message = status?.message ?? ""

    return <div>{message.length === 0 ? "Awaiting Data" : message}</div>
  }

  if (price == null) {
    const message = status?.message ?? ""

    return <div>{message.length === 0 ? "Awaiting Prices" : message}</div>
  }

  const currentPosition = price?.currentIndex ?? 0

  const lookback = LOOKBACK[range ?? "1m"] ?? 30

  const start = currentPosition > lookback ? currentPosition - lookback : 0
  const end = currentPosition

  const timestamps = data?.timestamps?.slice(start, end) ?? []

  const highs = data?.highs?.slice(start, end) ?? []
  const lows = data?.lows?.slice(start, end) ?? []
  const opens = data?.opens?.slice(start, end) ?? []
  const closes = data?.closes?.slice(start, end) ?? []

  const labels = timestamps

  const hideOpenPoints = timestamps.length > 30
  const hideClosePoints = timestamps.length > 30

  const openColor = (price?.open ?? 0) > closes[timestamps.length - 1] ? cssVar("--outcome-profit") : cssVar("--outcome-loss")

  const calculateOpenColor = (context: any) => {
    const datasets = context.chart.data.datasets

    const currentOpen = datasets[0].data[context.dataIndex]

    const lastClose = context.dataIndex > 0 ? datasets[1].data[context.dataIndex - 1] : undefined

    return currentOpen > lastClose ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
  }

  const calculateCloseColor = (context: any) => {
    const datasets = context.chart.data.datasets

    const currentOpen = datasets[0].data[context.dataIndex]

    const currentClose = datasets[1].data[context.dataIndex]

    return currentClose > currentOpen ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
  }

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
      label: "opens",
      data: opens,
      pointRadius: 4,
      borderWidth: 0,
      fill: false,
      pointBackgroundColor: calculateOpenColor,
      // borderColor: openColor,
      // tension: 0.3,
      pointStyle: "rect",
      hidden: hideOpenPoints,
    },
    {
      label: "close",
      data: closes,
      pointRadius: 4,
      borderWidth: 0,
      fill: false,
      pointBackgroundColor: calculateCloseColor,
      // borderColor: "#696969",
      // tension: 0.3,
      pointStyle: "circle",
      hidden: hideClosePoints,
    },
    {
      label: "high",
      data: highs,
      pointRadius: 0,
      borderWidth: 1,
      fill: 3,
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
          line1: {
            type: "line",
            yMin: price?.open,
            yMax: price?.open,
            borderColor: openColor,
            borderWidth: 1,
            display: !(price?.marketClosed ?? false),
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
