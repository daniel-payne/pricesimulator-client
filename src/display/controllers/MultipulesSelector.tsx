import { useQueryState } from "@keldan-systems/state-mutex"

import { FaHeart } from "react-icons/fa6"

import type { HTMLAttributes, PropsWithChildren } from "react"

export type Multipules = "on" | "off"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

const UNSELECTED_BUTTON = "btn btn-sm btn-ghost"
const SELECTED_BUTTON = "btn btn-sm btn-info"

const TOOLTIP = "Favorites"

export default function MultipulesSelector({ name = "MultipulesSelector", ...rest }: PropsWithChildren<ComponentProps>) {
  const [view, setView] = useQueryState<Multipules>("multipules", "off")

  const handleClick = () => {
    const newValue = view === "on" ? "off" : "on"

    setView(newValue)
  }

  let classNameSwitch = UNSELECTED_BUTTON

  switch (view) {
    case "on":
      classNameSwitch = SELECTED_BUTTON
      break
    case "off":
      classNameSwitch = UNSELECTED_BUTTON
      break
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="tooltip tooltip-bottom" data-tip={TOOLTIP} onClick={handleClick}>
          <div className={classNameSwitch}>
            <FaHeart />
          </div>
        </div>
      </div>
    </div>
  )
}
