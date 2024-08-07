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

import type { Range } from "@/display/components/choosers/RangeChooser"

import cssVar from "@/utilities/cssVar"
import { Data } from "@/data/indexDB/types/Data"
import { Status } from "@/data/indexDB/types/Status"
import { Timer } from "@/data/indexDB/types/Timer"
import { Price } from "@/data/indexDB/types/Price"
import { ONE_HOUR } from "@/data/indexDB/constants/ONE_HOUR"

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

const OPEN_TIME = ONE_HOUR * 8
const MID_TIME = ONE_HOUR * 12
const CLOSE_TIME = ONE_HOUR * 16

export default function RangeChart({
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

  let displayHighs: Array<number | undefined> = highs
  let displayLows: Array<number | undefined> = lows
  let displayOpens: Array<number | undefined> = opens
  let displayCloses: Array<number | undefined> = closes

  let labels = timestamps

  if (timestamps.length <= 30) {
    displayHighs = []
    displayLows = []
    displayOpens = []
    displayCloses = []

    labels = []

    for (let i = 0; i < timestamps.length; i++) {
      const timestamp = timestamps[i]

      const openTimeStamp = timestamp + OPEN_TIME
      const midTimeStamp = timestamp + MID_TIME
      const closeTimeStamp = timestamp + CLOSE_TIME

      displayOpens.push(opens[i])
      displayOpens.push(undefined)
      displayOpens.push(undefined)

      displayHighs.push(undefined)
      displayHighs.push(highs[i])
      displayHighs.push(undefined)

      displayLows.push(undefined)
      displayLows.push(lows[i])
      displayLows.push(undefined)

      displayCloses.push(undefined)
      displayCloses.push(undefined)
      displayCloses.push(closes[i])

      labels.push(openTimeStamp)
      labels.push(midTimeStamp)
      labels.push(closeTimeStamp)
    }
  }

  const hideOpenPoints = timestamps.length > 30
  const hideClosePoints = timestamps.length > 30

  const openColor = (price?.open ?? 0) > (price?.lastClose ?? 0) ? cssVar("--outcome-profit") : cssVar("--outcome-loss")

  const calculateOpenColor = (context: any) => {
    const datasets = context.chart.data.datasets

    if (context.dataIndex > 1) {
      const currentOpen = datasets[0].data[context.dataIndex]

      const lastClose = context.dataIndex > 0 ? datasets[1].data[context.dataIndex - 1] : undefined

      return currentOpen > lastClose ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
    }

    return cssVar("--outcome-neutral")
  }

  const calculateCloseColor = (context: any) => {
    const datasets = context.chart.data.datasets

    if (context.dataIndex > 1) {
      const currentOpen = datasets[0].data[context.dataIndex - 2]

      const currentClose = datasets[1].data[context.dataIndex]

      return currentClose > currentOpen ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
    }

    return cssVar("--outcome-neutral")
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
      data: displayOpens,
      pointRadius: 4,
      borderWidth: 0,
      fill: false,
      pointBackgroundColor: calculateOpenColor,
      // borderColor: openColor,
      // tension: 0.3,
      pointStyle: "circle",
      hidden: hideOpenPoints,
    },
    {
      label: "close",
      data: displayCloses,
      pointRadius: 7,
      borderWidth: 0,
      fill: false,
      pointBackgroundColor: calculateCloseColor,
      // borderColor: "#696969",
      // tension: 0.3,
      pointStyle: "rectRot",
      hidden: hideClosePoints,
    },
    {
      label: "high",
      data: displayHighs,
      pointRadius: 0,
      borderWidth: 1,
      fill: 3,
      borderColor: cssVar("--graph-range"),
      backgroundColor: cssVar("--graph-range"),
      tension: 0.2,
      spanGaps: true,
    },
    {
      label: "low",
      data: displayLows,
      pointRadius: 0,
      borderWidth: 1,
      fill: false,
      borderColor: cssVar("--graph-range"),
      tension: 0.2,
      spanGaps: true,
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
            display: !(price?.isMarketClosed ?? false),
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
