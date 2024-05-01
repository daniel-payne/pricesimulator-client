import type { HTMLAttributes, PropsWithChildren } from "react"
import DefaultElement from "../DefaultElement"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusFooter({ name = "StatusFooter", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-controller={name}>
      <div className="flex flex-row gap-2 justify-between items-center bg-base-200 p-2">
        <DefaultElement name="ActiveTradeBadges" />
        <DefaultElement name="CurrentBalanceSummary" />
      </div>
    </div>
  )
}
