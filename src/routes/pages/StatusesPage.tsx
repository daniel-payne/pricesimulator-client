import useStatuses from "@/data/indexDB/hooks/useStatuses"
import FlowLayout from "@/display/components/layouts/FlowLayout"
import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function StatusesPage({ name = "StatusesPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const statuses = useStatuses()

  return (
    <div {...rest} data-component={name}>
      <FlowLayout className="h-full w-full" addBorder={true}>
        {statuses?.map((status) => (
          <pre key={status.symbol} className="h-full w-full p-2 overflow-hidden">
            {JSON.stringify(status, null, 2)}
          </pre>
        ))}
      </FlowLayout>
    </div>
  )
}
