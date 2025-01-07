import type { Action } from "./controllers/ActionSelector"
import type { Behavior } from "./controllers/BehaviorSelector"
import type { Content } from "./controllers/ContentChooser"
import type { View } from "./controllers/ViewChooser"
import type { Range } from "./controllers/RangeChooser"
import type { Trade } from "./controllers/TradeChooser"
import type { Info } from "./controllers/InfoSelector"

export type Settings = {
  view?: View
  content?: Content

  range?: Range
  trade?: Trade

  infos?: Info
  behaviors?: Behavior
  actions?: Action

  showFavorites?: boolean
  showMultiples?: boolean
  showDescription?: boolean

  onAction?: ({ action, options }: { action: string; options?: any }) => void

  // [key: string]: any
}
