export type Status = {
  symbol?: string

  state?: "empty" | "retrieving" | "processing" | "storing" | "loaded" | "error"

  priceCount?: number

  firstActiveTimestamp?: number | null | undefined
  firstInterdayTimestamp?: number | null | undefined

  [index: string]: any
}
