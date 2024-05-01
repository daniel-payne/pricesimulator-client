import type { Price } from "../types/Price"
import useStatus from "./useStatus"

export default function useCurrentPriceForSymbol(symbol: string): Price | undefined {
  const status = useStatus()

  let price

  const currentPriceForSymbol = status?.currentPriceForSymbol ?? {}

  const entry = Object.entries(currentPriceForSymbol).find(([match]) => match === symbol)

  if (entry != null && entry[1] != null) {
    price = entry[1]
  }

  return price
}
