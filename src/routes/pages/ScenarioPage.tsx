// import { useLoaderData } from "react-router-dom"

import type { HTMLAttributes, PropsWithChildren } from "react"

// export async function loader({ request, params }: any) {
//   const url = new URL(request.url)
//   const search = url.searchParams.toString()

//   return { params, search }
// }

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ScenarioPage({ name = "ScenarioPage", ...rest }: PropsWithChildren<ComponentProps>) {
  return (
    <div {...rest} data-component={name}>
      <div className="p-6">{name}</div>
    </div>
  )
}
