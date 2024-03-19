"use client"

import Image from "next/image"

import extractCurrentPriceFromPrices from "@/utilities/extractCurrentPriceFromPrices"
import extractDateFromDay from "@/utilities/extractDateFromDay"
import extractNameFromDay from "@/utilities/extractNameFromDay"
import { Button, Avatar } from "@nextui-org/react"
import { useEffect, type HTMLAttributes, type PropsWithChildren } from "react"
// import MarketChooser from "./MarketChooser"
import { useSearchParams } from "next/navigation"
// import useScenario from "@/data/indexDB/hooks/useScenario"
import Link from "next/link"
import CurrentDayDisplay from "@/components//display/CurrentDayDisplay"

type ComponentProps = {
  description?: string

  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataHeader({ description, title = "DataHeader", children, ...rest }: PropsWithChildren<ComponentProps>) {
  // const status = useStatus()

  // const { currentDay } = status

  // const dayOfWeek = extractNameFromDay(currentDay)
  // const formattedDate = extractDateFromDay(currentDay)

  return (
    <div {...rest} data-component={title}>
      <div className="flex flex-row items-center justify-between  p-2">
        <div className="  flex flex-row items-center justify-start gap-2 ps-1">
          <Link href={`/`}>
            <Image src="/pricesimulator.png" width={36} height={36} alt="Home Page" />
          </Link>
          <h1>{description}</h1>
        </div>

        <div>
          <h1>{description == null ? "Price Simulator" : null}</h1>
        </div>

        <CurrentDayDisplay />

        {/* <div className="  flex flex-row items-center justify-end gap-2 ps-1">
          <div className="text-lg  ">{dayOfWeek}</div>
          <div className="text-sm  ">{formattedDate}</div>
        </div> */}
      </div>
    </div>
  )
}
