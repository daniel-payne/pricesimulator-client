
import type { Content } from "./controllers/ContentChooser"
import type { View } from "./controllers/ViewChooser"
import type { Range } from "./controllers/RangeChooser"
import type { Trade } from "./controllers/TradeChooser"


export type Settings = {
  view?: View

  content?: Content
  range?: Range
  trade?: Trade

  showExpanded?: boolean

  showSummary?: boolean
  showController?: boolean
  showAction?: boolean

  showFavorites?: boolean
  showMultiples?: boolean
  showDescription?: boolean

  onAction?: ({ action, options }: { action: string; options?: any }) => void

  // [key: string]: any
}
