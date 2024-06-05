export type Trend = {
  symbol: string

  firstActiveTimestamp: number | null
  firstInterdayTimestamp: number | null

  timestamps: Array<number | null>
  opens: Array<number | null>
  highs: Array<number | null>
  lows: Array<number | null>
  closes: Array<number | null>
  volumes: Array<number | null>

  timegaps: Array<number | null>
  interdays: Array<number | null>
}
