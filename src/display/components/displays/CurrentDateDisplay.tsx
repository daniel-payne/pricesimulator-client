import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Timer } from "@/data/indexDB/types/Timer"

type ComponentProps = {
  timer?: Timer

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function CurrentDateDisplay({ timer, name = "CurrentDateDisplay", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <strong>{formatTimestampDay(timer?.currentDay)}</strong> {formatTimestamp(timer?.currentDay)}
    </div>
  )
}
