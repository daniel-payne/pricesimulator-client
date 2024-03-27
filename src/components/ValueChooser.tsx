import { type HTMLAttributes, type PropsWithChildren, useState } from "react"

type ComponentProps = {
  options: Array<{ value: number | string; label: string; info?: string }>

  displayAsButtons?: boolean

  onValueChanged?: (value: number) => void

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ValueChooser({ options, onValueChanged, displayAsButtons = true, name = "ValueChooser", ...rest }: PropsWithChildren<ComponentProps>) {
  const [selectedValue, setSelectedValue] = useState(25)

  const manipulateChange = (value: any) => () => {
    setSelectedValue(value)

    if (onValueChanged) {
      onValueChanged(value)
    }
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row justify-start bg-white">
        {displayAsButtons ? (
          <OptionsAsTabButtons options={options} selectedValue={selectedValue} manipulateChange={manipulateChange} />
        ) : (
          <OptionsAsRadioButtons options={options} selectedValue={selectedValue} manipulateChange={manipulateChange} />
        )}
      </div>
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const OptionsAsRadioButtons = ({ options, selectedValue, manipulateChange }: any) => {
  return (
    <div className="form-control flex flex-row">
      {options?.map((option: any) => {
        return (
          <label className="label cursor-pointer flex flex-col" key={option.value}>
            <span className="label-text">{option.label}</span>
            <input type="radio" name="radio-1M" className="ms-2 radio-xs" checked={selectedValue === option.value} onClick={manipulateChange(option.value)} />
            <span className="label-text text-sm">{option.info}</span>
          </label>
        )
      })}
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const OptionsAsTabButtons = ({ options, selectedValue, manipulateChange }: any) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <div role="tablist" className="tabs-xs tabs-boxed">
        {options?.map((option: any) => {
          return (
            <div role="tab" className={`tab ${selectedValue === option.value ? "tab-active" : ""}`} onClick={manipulateChange(option.value)}>
              {/* <div className="flex flex-col gap-2"> */}
              <div>{option.label}</div>
              {/* {selectedValue !== option.value ? <div>{option.info}</div> : null} */}
              {/* </div> */}
            </div>
          )
        })}
      </div>
      <div className="text-xs">
        {options?.map((option: any) => {
          if (selectedValue === option.value) {
            return <div>{option.info}</div>
          } else {
            return null
          }
        })}
      </div>
    </div>
  )
}
