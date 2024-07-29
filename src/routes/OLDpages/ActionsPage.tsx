import TradesData from "@/display/elements/test/TradesData"
import MarketsData from "@/display/elements/test/MarketsTest"

// import ScenariosData from "@/display/elements/data/ScenariosData"

import TimerData from "@/display/elements/test/TimerTest"

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
