"use client"

import Chart from "chart.js/auto"

import { Line } from "react-chartjs-2"

// import { useWindowSize } from "react-use"
//
import "chartjs-adapter-date-fns"

Chart.register()

// const MILLISECONDS = 24 * 60 * 60 * 1000

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  timestamps: number[]
  highs: number[]
  lows: number[]
  closes: number[]

  price: any

  range?: number

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HistoryChart({
  timestamps = [],
  highs = [],
  lows = [],
  closes = [],

  price = {},

  range = 260,

  name = "DatumChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  if (timestamps == null || timestamps.length === 0 || !Array.isArray(timestamps)) {
    return <div>No Data for </div>
  }

  const startIndex = timestamps.length - range

  const labels = timestamps.slice(startIndex)

  const opens = Array.from({ length: range }, () => price.open)

  const closePointWidth = labels.length < 30 ? 4 : 0

  const openColor = price.open > closes[timestamps.length - 1] ? "#00cc66" : "#ff1a1a"

  const datasets = [
    {
      label: "opens",
      data: opens,
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      borderColor: openColor,
      // borderColor: "#696969",
      // tension: 0.3,
    },

    {
      label: "close",
      data: closes.slice(startIndex),
      pointRadius: closePointWidth,
      borderWidth: 0,
      fill: false,
      pointColor: "#696969",
      // borderColor: "#696969",
      // tension: 0.3,
    },
    {
      label: "high",
      data: highs.slice(startIndex),
      pointRadius: 0,
      borderWidth: 1,
      fill: 3,
      borderColor: "#DCDCDC",
      backgroundColor: "#DCDCDC",
      tension: 0.2,
    },
    {
      label: "low",
      data: lows.slice(startIndex),
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      borderColor: "#DCDCDC",
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
    },
    commonUpdate: true,
  } as any

  return (
    <div {...rest} data-component={name} style={{ backgroundColor: "white" }}>
      <div style={{ height: "99%", width: "99%", position: "relative" }}>
        <Line datasetIdKey="id" data={{ labels, datasets }} options={options} />
      </div>
    </div>
  )
}
