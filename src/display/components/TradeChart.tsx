import Chart from "chart.js/auto"
import annotationPlugin from "chartjs-plugin-annotation"

import { Chart as Multi } from "react-chartjs-2"

import "chartjs-adapter-date-fns"

Chart.register([annotationPlugin])

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Range } from "@/display/components/HistoryRangeChooser"

import cssVar from "@/utilities/cssVar"
import { Data } from "@/data/indexDB/types/Data"
import { Status } from "@/data/indexDB/types/Status"
import { Timer } from "@/data/indexDB/types/Timer"
import { Price } from "@/data/indexDB/types/Price"
import addTimestamp from "@/utilities/addTimestamp"
import formatTimestampISO from "@/utilities/formatTimestampISO"
import { Trade } from "@/data/indexDB/types/Trade"
import { TradeStatus } from "@/data/indexDB/enums/TradeStatus"

type ComponentProps = {
  timestamp: number | null | undefined
  data?: Data | null | undefined
  price?: Price | null | undefined
  range?: Range | null | undefined
  status?: Status | null | undefined
  timer?: Timer | null | undefined
  trade?: Trade | null | undefined

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HighLowChart({
  timestamp,
  data,
  price,
  status,
  trade,

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

  const opens = data?.opens?.slice(0, end) ?? []
  const closes = data?.closes?.slice(0, end) ?? []

  const labels = data?.timestamps?.slice(0, end) ?? []

  const movements: (number | boolean)[][] = []

  let priorAmount = -1
  let priorPeriod = "days" as "days" | "weeks" | "months" | "years"

  let displayOpenClose = false

  if (range === "1m") {
    priorAmount = -1
    priorPeriod = "months"
    displayOpenClose = true
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

  if (displayOpenClose) {
    for (let i = 0; i < labels.length; i++) {
      const open = opens?.[i] ?? 0
      const close = closes?.[i] ?? 0

      const top = Math.max(open, close)
      const bottom = Math.min(open, close)

      const rise = close > open

      movements.push([bottom, top, rise])
    }
  }

  // const endTimestamp = trade == null ? timestamp : trade?.expiryTimestamp

  // const startISO = range === "at" ? "1970-01-01" : formatTimestampISO(addTimestamp(timestamp, priorAmount, priorPeriod, false))
  // const endISO = formatTimestampISO(addTimestamp(endTimestamp, +1, "days", false))

  let startISO
  let endISO

  let tradeTargetHighColor
  let tradeTargetLowColor

  let showTradeTargets = false

  let tradeStartISO
  let tradeEndISO
  let showTradePerformance = false
  let tradeTargetStart
  let tradeTargetEnd
  let tradeOutcomeColor
  let tradeOutcomeColorWash

  if (trade == null) {
    startISO = range === "at" ? "1970-01-01" : formatTimestampISO(addTimestamp(timestamp, priorAmount, priorPeriod, false))
    endISO = formatTimestampISO(addTimestamp(timestamp, +1, "days", false))
  } else {
    showTradeTargets = true

    startISO = range === "at" ? "1970-01-01" : formatTimestampISO(addTimestamp(trade.entryTimestamp, priorAmount, priorPeriod, false))
    endISO = formatTimestampISO(addTimestamp(trade.expiryTimestamp, +1, "days", false))

    tradeStartISO = formatTimestampISO(trade.entryTimestamp)
    tradeEndISO = formatTimestampISO(trade.exitTimestamp)

    tradeTargetHighColor = trade.direction === "CALL" ? cssVar("--outcome-profit-25") : cssVar("--outcome-loss-25")
    tradeTargetLowColor = trade.direction === "CALL" ? cssVar("--outcome-loss-25") : cssVar("--outcome-profit-25")

    showTradePerformance = trade.status === TradeStatus.CLOSED

    tradeTargetStart = trade.entryPrice
    tradeTargetEnd = trade.exitPrice

    tradeOutcomeColor = trade.profit > 0 ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
    tradeOutcomeColorWash = trade.profit > 0 ? cssVar("--outcome-profit-25") : cssVar("--outcome-loss-25")
  }

  const pricePointValue = isMarketClosed ? priorClose : currentOpen
  const pricePointISO = isMarketClosed ? formatTimestampISO(priorTimestamp) : formatTimestampISO(currentTimestamp)
  const pricePointColor = isMarketClosed
    ? (priorClose ?? 0) > (priorOpen ?? 0)
      ? cssVar("--outcome-profit")
      : cssVar("--outcome-loss")
    : (currentOpen ?? 0) > (priorClose ?? 0)
    ? cssVar("--outcome-profit")
    : cssVar("--outcome-loss")

  const datasets: Array<any> = []

  if (displayOpenClose) {
    datasets.push({
      type: "bar" as const,
      label: "Dataset 2",
      backgroundColor: ({ dataIndex }: any) => {
        const movement = movements[dataIndex] as any

        return movement[2] ? cssVar("--outcome-profit") : cssVar("--outcome-loss")
      },
      data: movements,
      borderWidth: 0,
      barPercentage: 0.33,
      borderRadius: ({ dataIndex }: any) => {
        const movement = movements[dataIndex] as any

        return movement[2] ? { topLeft: 64, topRight: 64, bottomLeft: 2, bottomRight: 2 } : { topLeft: 2, topRight: 2, bottomLeft: 64, bottomRight: 64 }
      },
      borderSkipped: false,
      display: displayOpenClose,
    })
  }

  datasets.push(
    {
      type: "line",
      label: "high",
      data: highs,
      pointRadius: 0,
      borderWidth: 1,
      fill: displayOpenClose ? 2 : 1,
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
    }
  )

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
          tradeTargetHigh: {
            type: "line",
            yMin: trade?.entryPrice,
            yMax: trade?.entryPrice + 1000,
            xMin: endISO,
            xMax: endISO,
            borderColor: tradeTargetHighColor,
            borderWidth: 24,
            adjustScaleRange: false,
            display: showTradeTargets,
          },
          tradeTargetLow: {
            type: "line",
            yMin: trade?.entryPrice,
            yMax: 0,
            xMin: endISO,
            xMax: endISO,
            borderColor: tradeTargetLowColor,
            borderWidth: 24,
            adjustScaleRange: false,
            display: showTradeTargets,
          },
          tradePerformance: {
            type: "line",
            yMin: tradeTargetStart,
            yMax: tradeTargetEnd,
            xMin: tradeStartISO,
            xMax: tradeEndISO,
            borderColor: tradeOutcomeColorWash,
            borderWidth: 14,
            adjustScaleRange: false,
            display: showTradePerformance,
            // arrowHeads: {
            //   start: {
            //     display: true,
            //     width: 4,
            //     fill: true,
            //   },
            //   end: {
            //     display: true,
            //     width: 4,
            //     fill: true,
            //   },
            // },
          },
          tradeEntryPoint: {
            type: "point",
            radius: 6,
            yValue: tradeTargetStart,
            xValue: tradeStartISO,
            borderColor: tradeOutcomeColor,
            // backgroundColor: pricePointColor,
            borderWidth: 1,
            display: showTradePerformance,
          },
          tradeExitPoint: {
            type: "point",
            radius: 6,
            yValue: tradeTargetEnd,
            xValue: tradeEndISO,
            borderColor: tradeOutcomeColor,
            // backgroundColor: pricePointColor,
            borderWidth: 1,
            display: showTradePerformance,
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
