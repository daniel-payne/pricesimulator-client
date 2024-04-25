import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DefaultController({ name = "DefaultController", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-controller={name} style={{ border: "1px solid grey", padding: 2 }}>
      <h1>{name}</h1>

      {children}
    </div>
  )
}
