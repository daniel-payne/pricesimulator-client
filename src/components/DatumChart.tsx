"use client"

import Chart from "chart.js/auto"

import { Line } from "react-chartjs-2"

// import { useWindowSize } from "react-use"
//
import "chartjs-adapter-date-fns"

Chart.register()

// const MILLISECONDS = 24 * 60 * 60 * 1000

import { useEffect, type HTMLAttributes, type PropsWithChildren, useState } from "react"

type ComponentProps = {
  datum: any
  labelName: string
  dataNames: string

  currentIndex?: number
  range?: number
  compareNames?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DatumChart({
  datum = {},
  labelName,
  dataNames,
  currentIndex,

  range = 260,

  name = "DatumChart",
  ...rest
}: PropsWithChildren<ComponentProps>) {
  const timestamps = datum?.timestamps

  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(timestamps?.length)

  useEffect(() => {
    if (timestamps?.length) {
      if (currentIndex != null) {
        setStartIndex(Math.max(currentIndex - range, 0))
        setEndIndex(currentIndex)
      }
    }
  }, [currentIndex, datum, timestamps, range])

  if (timestamps == null || timestamps.length === 0 || !Array.isArray(timestamps)) {
    return <div>No Data for {dataNames}</div>
  }

  const labels = datum[labelName].slice(startIndex, endIndex)

  const datasets = [
    {
      label: "high",
      data: datum.highs.slice(startIndex, endIndex),
      pointRadius: 0,
      borderWidth: 1,
      fill: 1,
      borderColor: "#DCDCDC",
      backgroundColor: "#DCDCDC",
      tension: 0.2,
    },
    {
      label: "low",
      data: datum.lows.slice(startIndex, endIndex),
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
            day: "dd MMM yyyy",
          },
        },
      },
      y: {
        display: true,
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
