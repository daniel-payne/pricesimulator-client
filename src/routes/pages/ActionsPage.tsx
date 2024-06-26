import TradesData from "@/display/elements/data/TradesData"
import MarketsData from "@/display/elements/data/MarketsData"

// import ScenariosData from "@/display/elements/data/ScenariosData"

import TimerData from "@/display/elements/data/TimerData"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ActionsPage({ name = "ActionsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      {/* <div className="px-2 py-4 text-2xl font-bold">{status?.message}</div> */}
      <TimerData />
      <TradesData />
      {/* <ScenariosData /> */}
      <MarketsData />
    </div>
  )
}
