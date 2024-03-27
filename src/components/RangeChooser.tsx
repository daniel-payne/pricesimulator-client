import ValueChooser from "@/components/ValueChooser"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  onRangeChanged?: (value: number) => void

  name?: string
} & HTMLAttributes<HTMLDivElement>

const options = [
  { value: 15000, label: "All Time", info: "Jan 1970" },
  { value: 1300, label: "5 Years", info: "Mar 2001" },
  { value: 260, label: "1 Year", info: "Mar 2005" },
  { value: 75, label: "3 Months", info: "Dec 2005" },
  { value: 25, label: "1 Month", info: "Feb 2006" },
]

export default function RangeChooser({ onRangeChanged, name = "ValueChooser", ...rest }: PropsWithChildren<ComponentProps>) {
  const handleChange = (value: any) => {
    if (onRangeChanged) {
      onRangeChanged(value)
    }
  }

  return <ValueChooser {...rest} data-component={name} options={options} onValueChanged={handleChange} />
}
