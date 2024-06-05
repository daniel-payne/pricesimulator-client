import { useQueryState } from "@keldan-systems/state-mutex"

import { FaArrowDownShortWide, FaArrowUpShortWide, FaHeart, FaInfo } from "react-icons/fa6"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

type View = "graph" | "compact" | "favorites" | "information"

const UNSELECTED_BUTTON = "btn btn-sm btn-ghost"
const SELECTED_BUTTON = "btn btn-sm btn-info"

export default function DetailViewChooser({ name = "DetailViewChooser", ...rest }: PropsWithChildren<ComponentProps>) {
  const [view, setView] = useQueryState<View>("view", "graph")

  const handleClick = (range: View) => {
    return () => setView(range)
  }

  const handleClickGRA = handleClick("graph")
  const handleClickCOM = handleClick("compact")
  const handleClickFAV = handleClick("favorites")
  const handleClickINF = handleClick("information")

  let classNameGRA = UNSELECTED_BUTTON
  let classNameCOM = UNSELECTED_BUTTON
  let classNameFAV = UNSELECTED_BUTTON
  let classNameINF = UNSELECTED_BUTTON

  switch (view) {
    case "graph":
      classNameGRA = SELECTED_BUTTON
      break
    case "compact":
      classNameCOM = SELECTED_BUTTON
      break
    case "favorites":
      classNameFAV = SELECTED_BUTTON
      break
    case "information":
      classNameINF = SELECTED_BUTTON
      break
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="tooltip tooltip-open tooltip-bottom" data-tooltip="Graph">
          <div className={classNameGRA} onClick={handleClickGRA}>
            <FaArrowDownShortWide />
          </div>
        </div>
        <div className={classNameCOM} onClick={handleClickCOM}>
          <FaArrowUpShortWide />
        </div>
        <div className={classNameFAV} onClick={handleClickFAV}>
          <FaHeart />
        </div>
        <div className={classNameINF} onClick={handleClickINF}>
          <FaInfo />
        </div>
      </div>
    </div>
  )
}
