import { Children, cloneElement } from "react"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  padding?: number

  name?: string
} & HTMLAttributes<HTMLDivElement>

const StyleInjector = ({ size, padding, children }: any) => {
  const StyledChildren = () =>
    Children.map(children, (child) =>
      cloneElement(child, {
        className: `${child.props.className ?? ""} ${size} p-${padding}`,
      })
    )

  return <StyledChildren />
}

export default function LayoutManager({ padding = 0, name = "LayoutManager", children, ...rest }: PropsWithChildren<ComponentProps>) {
  const count = Children.count(children)

  let size = "w-1/3 h-1/5"

  if (count > 36) {
    size = "w-1/6  h-auto"
  } else if (count > 30) {
    size = "w-1/6  h-1/6" //  36
  } else if (count > 25) {
    size = "w-1/5  h-1/6" //  30
  } else if (count > 20) {
    size = "w-1/5  h-1/5" // 25
  } else if (count > 16) {
    size = "w-1/4  h-1/5" // 20
  } else if (count > 12) {
    size = "w-1/4  h-1/4" // 16
  } else if (count > 9) {
    size = "w-1/3  h-1/4" // 12
  } else if (count > 6) {
    size = "w-1/3  h-1/3" // 9
  } else if (count > 4) {
    size = "w-1/2  h-1/3" // 6
  } else if (count > 3) {
    size = "w-1/2  h-1/2" // 4
  } else if (count > 2) {
    size = "w-full h-1/3" // 3
  } else if (count > 1) {
    size = "w-full h-1/2" // 2
  } else {
    size = "w-full h-full" // 1
  }

  return (
    <div {...rest} data-component={name}>
      <div className={`overflow-auto h-full w-full flex flex-row flex-wrap justify-start items-start gap-0`}>
        <StyleInjector size={size} padding={padding}>
          {children}
        </StyleInjector>
      </div>
    </div>
  )
}
