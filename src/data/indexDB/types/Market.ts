import { Index } from "./Index"
import { Price } from "./Price"

export type Market = {
  symbol: string
  name: string

  [index: string]: any
}
