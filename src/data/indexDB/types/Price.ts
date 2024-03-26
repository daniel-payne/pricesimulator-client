export type Price = {
  symbol: string
  timestamp: number

  day?: string

  open?: number
  high?: number
  low?: number
  close?: number

  marketClosed?: boolean

  lastClose?: number
  nextOpen?: number

  midRangePrice?: number
  midDayPrice?: number

  bid?: number
  offer?: number

  currentIndex?: number

  [index: string]: any
}
