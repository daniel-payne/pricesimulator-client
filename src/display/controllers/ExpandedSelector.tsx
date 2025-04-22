import { useQueryState } from "@keldan-systems/state-mutex"

import { FaArrowDownShortWide } from "react-icons/fa6"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  isDisabled?: boolean

  name?: string
} & HTMLAttributes<HTMLDivElement>

const UNSELECTED_BUTTON = "btn btn-sm btn-ghost"
const SELECTED_BUTTON = "btn btn-sm btn-info"

const TOOLTIP = "Show Expanded"

export default function ExpandedSelector({ isDisabled = false, name = "ExpandedSelector", ...rest }: PropsWithChildren<ComponentProps>) {
  const [view, setView] = useQueryState<boolean>("show-expanded", false)

  const handleClick = () => {
    const newValue = !view

    setView(newValue)
  }

  let classNameSwitch = UNSELECTED_BUTTON

  switch (view) {
    case true:
      classNameSwitch = SELECTED_BUTTON
      break
    case false:
      classNameSwitch = UNSELECTED_BUTTON
      break
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="tooltip tooltip-bottom" data-tip={TOOLTIP} onClick={handleClick}>
          <button className={classNameSwitch} disabled={isDisabled}>
            <FaArrowDownShortWide />
          </button>
        </div>
      </div>
    </div>
  )
}
