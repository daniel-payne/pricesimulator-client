import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  title?: string
} & HTMLAttributes<HTMLDivElement>

export default function DefaultComponent({ title = "DefaultComponent", children, ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={title} style={{ border: "1px solid grey", padding: 2 }}>
      <h1>{title}</h1>

      {children}
    </div>
  )
}
