import TrendsListing from "@/display/elements/TrendsListing"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TrendsPage({ name = "TrendsPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full ">
        <TrendsListing />
      </div>
    </div>
  )
}
