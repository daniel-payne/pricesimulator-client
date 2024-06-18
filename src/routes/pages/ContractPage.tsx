import MarketContract from "@/display/elements/MarketContract"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { useParams } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ContractPage({ name = "ContractPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const { focus } = useParams()

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full p-6">
        <MarketContract className="h-full w-full" symbol={focus} />
      </div>
    </div>
  )
}
