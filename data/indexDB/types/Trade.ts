export type Trade = {
  reference: string
  symbol: string

  notionalAmount: number
  tradeDirection: "CALL" | "PUT"

  openingValue: number
  closingValue?: number

  openingDay: string
  closingDay?: string

  openingPrice: number
  closingPrice?: number

  profit?: number

  [key: string]: any
}

// Amount is stored
// Amount = Value  / ( Price * Modifier )
// Value  = Amount * ( Price * Modifier )
