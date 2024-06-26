import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function AccountSummary({ name = "AccountSummary", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-controller={name}>
      <div className="pe-2 text-profit">$5,000</div>
    </div>
  )
}
