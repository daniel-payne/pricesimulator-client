import toNumeric from "./toNumeric"

export default function formatValue(input: number | undefined | null, showCents = false) {
  if (input == null) return ""

  const number = toNumeric(input) ?? 0

  if (number === 0) {
    return showCents ? "0.00" : "0"
  }

  const digits = showCents ? 2 : 0

  return number.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })
}
