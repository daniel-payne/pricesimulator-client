import { useDataState } from "@keldan-systems/state-mutex"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ApplicationStatusPage({ name = "ApplicationStatusPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const applicationState = useDataState("APPLICATION-STATUS")

  return (
    <div {...rest} data-component={name}>
      APPLICATION-STATUS : {JSON.stringify(applicationState)}
    </div>
  )
}
