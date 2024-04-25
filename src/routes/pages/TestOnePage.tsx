// import MarketsTest from "@/controllers/tests//MarketsTest"
// import ScenariosTest from "@/controllers/tests//ScenariosTest"
import StatusTest from "@/controllers/tests/StatusTest"

import type { HTMLAttributes, PropsWithChildren } from "react"

// import db from "@/data/indexDB/db"
import { useLoaderData } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export async function loader({ request, params }: any) {
  const url = new URL(request.url)
  const search = url.searchParams.toString()

  return { params, search }
}

export default function MarketPage({ name = "MarketPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const data = useLoaderData() as any

  return (
    <div {...rest} data-component={name}>
      <h1>Test One</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* <ScenariosTest /> */}
      {/* <MarketsTest /> */}
      <StatusTest />
    </div>
  )
}
