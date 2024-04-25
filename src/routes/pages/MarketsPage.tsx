import MarketsListing from "@/elements/MarketsListing"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketsPage({ name = "MarketsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full ">
        <MarketsListing />
      </div>
    </div>
  )
}
