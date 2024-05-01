export type Trade = {
  reference: string
  symbol: string

  notionalAmount: number
  tradeDirection: "CALL" | "PUT"

  openingValue?: number
  closingValue?: number

  openingDay: string
  closingDay?: string

  openingRate: number
  closingRate?: number

  profit?: number

  [key: string]: any
}

// Amount is stored
// Amount = Value  / ( Rate * Modifier )
// Value  = Amount * ( Rate * Modifier )
