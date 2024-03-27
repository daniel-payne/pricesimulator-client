import ValueChooser from "@/components/ValueChooser"

import type { HTMLAttributes, PropsWithChildren } from "react"

export const ONE_MONTH = 25
export const THREE_MONTHS = 75
export const ONE_YEAR = 260
export const FIVE_YEARS = 1300
export const ALL_TIME = 15000

type ComponentProps = {
  defaultValue?: number

  onRangeChanged?: (value: number) => void

  name?: string
} & HTMLAttributes<HTMLDivElement>

const options = [
  { value: ALL_TIME, label: "All Time" },
  { value: FIVE_YEARS, label: "5 Years" },
  { value: ONE_YEAR, label: "1 Year" },
  { value: THREE_MONTHS, label: "3 Months" },
  { value: ONE_MONTH, label: "1 Month" },
]

export default function RangeChooser({ defaultValue, onRangeChanged, name = "ValueChooser", ...rest }: PropsWithChildren<ComponentProps>) {
  const handleChange = (value: any) => {
    if (onRangeChanged) {
      onRangeChanged(value)
    }
  }

  return <ValueChooser {...rest} data-component={name} defaultValue={defaultValue ?? 25} options={options} onValueChanged={handleChange} />
}
