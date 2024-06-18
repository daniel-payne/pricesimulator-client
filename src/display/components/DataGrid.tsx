import type { HTMLAttributes, PropsWithChildren } from "react"
import { FixedSizeGrid as Grid } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"

const Cell = ({ data, columnIndex, rowIndex, style }: { data: any; columnIndex: number; rowIndex: number; style: React.CSSProperties }) => {
  const { fields, list } = data

  let formattedDisplay

  if (rowIndex === 0) {
    formattedDisplay = fields[columnIndex]
  } else {
    const field = fields[columnIndex]

    const item = list?.[rowIndex - 1]

    const display = item != null ? item[field] : undefined

    formattedDisplay = display != null ? JSON.stringify(display).replace(/"/g, "") : ""
  }

  return (
    <div className="text-sm text-ellipsis overflow-hidden" style={style}>
      {formattedDisplay}
    </div>
  )
}

type ComponentProps = {
  list: Array<any> | undefined | null

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function DataGrid({ list, name = "DataGrid", ...rest }: PropsWithChildren<ComponentProps>) {
  const rowCount = list?.length != null ? list.length + 1 : 0
  const fields: Array<string> = []

  const scanCount = Math.min(rowCount, 100)

  for (let i = 0; i < scanCount; i++) {
    const item = list?.[i] || {}

    Object.keys(item).forEach((key) => {
      if (!fields.includes(key)) {
        fields.push(key)
      }
    })
  }

  const colCount = fields.length ?? 0

  return (
    <div {...rest} data-component={name}>
      <AutoSizer>
        {({ height, width }) => (
          <Grid
            className="List"
            itemData={{ list, fields }}
            height={height}
            rowCount={rowCount}
            //rowCount={datum?.timestamps.length ?? 0}
            columnCount={colCount}
            rowHeight={35}
            columnWidth={200}
            width={width}
          >
            {Cell}
          </Grid>
        )}
      </AutoSizer>
    </div>
  )
}
