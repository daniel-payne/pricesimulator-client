import { Link } from "react-router-dom"
import { FaArrowUpRightFromSquare, FaHeart } from "react-icons/fa6"

import type { HTMLAttributes, PropsWithChildren } from "react"

import type { Market } from "@/data/indexDB/types/Market"

type ComponentProps = {
  market?: Market | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function MarketBehaviors({ market, name = "MarketBehaviors", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-between gap-2">
        <FaHeart className="fg--subheading my-1" />
        <Link to={`/markets/${market?.symbol}/contract`} target="_blank">
          <FaArrowUpRightFromSquare className="fg--subheading my-1" />
        </Link>
      </div>
    </div>
  )
}
