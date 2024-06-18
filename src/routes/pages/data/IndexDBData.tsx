import db from "@/data/indexDB/db"

import DataGrid from "@/display/components/DataGrid"

import { useEffect, useState, type HTMLAttributes, type PropsWithChildren } from "react"
import { useParams } from "react-router-dom"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function IndexDBData({ name = "IndexDBData", ...rest }: PropsWithChildren<ComponentProps>) {
  const { source } = useParams()

  const [list, setList] = useState<any>()

  useEffect(() => {
    const run = async () => {
      let list: any

      if (source === "scenarios") {
        list = await db.scenarios.toArray()
      } else if (source === "markets") {
        list = await db.markets.toArray()
      } else if (source === "activeTrades") {
        list = await db.activeTrades.toArray()
      } else if (source === "inactiveTrades") {
        list = await db.inactiveTrades.toArray()
      }

      setList(list)
    }

    run()
  }, [source, setList])

  // const status = useDataState<any>("APPLICATION-STATUS")

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full px-2 py-4 text-2xl font-bold">
        <DataGrid className="h-full w-full" list={list} />
        {/* <pre>{JSON.stringify(list, null, 2)}</pre> */}
      </div>
    </div>
  )
}
