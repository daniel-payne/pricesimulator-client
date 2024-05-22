export type Trend = {
  symbol: string

  timestamps: number[]
  opens: number[]
  highs: number[]
  lows: number[]
  closes: number[]

  timegaps: number[]
}
