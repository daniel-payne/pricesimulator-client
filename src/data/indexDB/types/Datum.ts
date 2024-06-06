import { Data } from "./Data"

export type Datum = {
  timestamps: Data | undefined
  opens: Data | undefined
  highs: Data | undefined
  lows: Data | undefined
  closes: Data | undefined
}
