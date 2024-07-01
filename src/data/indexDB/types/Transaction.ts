export type Transaction = {
  id: string
  timestamp: number

  name: string
  value: number

  tradeId: boolean

  [index: string]: any
}
