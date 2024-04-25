export type Option = {
  notionalAmount: number
  optionDirection: "BUY" | "SELL"
  tradeDirection: "CALL" | "PUT"
  isNotionalContractBased: boolean

  notionalValue: number
  underlyingValue: number

  closingDate: string

  closingPrice: number

  profit?: number

  [key: string]: any
}
