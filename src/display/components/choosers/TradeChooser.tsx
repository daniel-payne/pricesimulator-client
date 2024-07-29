import { useQueryState } from "@keldan-systems/state-mutex"

import { FaCircleDollarToSlot, FaDollarSign, FaSackDollar, FaScaleBalanced } from "react-icons/fa6"

import type { HTMLAttributes, PropsWithChildren } from "react"

export type Trade = "contract" | "dollar" | "option" | "hedge"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

const UNSELECTED_BUTTON = "btn btn-sm btn-ghost"
const SELECTED_BUTTON = "btn btn-sm btn-info"

const TOOLTIP_CON = "Contract"

export default function TradeChooser({ name = "TradeChooser", ...rest }: PropsWithChildren<ComponentProps>) {
  const [view, setView] = useQueryState<Trade>("trade", "contract")

  const handleClick = (range: Trade) => {
    return () => setView(range)
  }

  const handleClickCON = handleClick("contract")
  const handleClickDOL = handleClick("dollar")
  const handleClickOPT = handleClick("option")
  const handleClickHED = handleClick("hedge")

  let classNameCON = UNSELECTED_BUTTON
  let classNameDOL = UNSELECTED_BUTTON
  let classNameOPT = UNSELECTED_BUTTON
  let classNameHED = UNSELECTED_BUTTON

  switch (view) {
    case "contract":
      classNameCON = SELECTED_BUTTON
      break
    case "dollar":
      classNameDOL = SELECTED_BUTTON
      break
    case "option":
      classNameOPT = SELECTED_BUTTON
      break
    case "hedge":
      classNameHED = SELECTED_BUTTON
      break
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row gap-2 justify-center items-center">
        <div className="tooltip tooltip-bottom" data-tip={TOOLTIP_CON} onClick={handleClickCON}>
          <div className={classNameCON}>
            <FaSackDollar />
          </div>
        </div>

        <div className={classNameDOL} onClick={handleClickDOL}>
          <FaDollarSign />
        </div>
        <div className={classNameOPT} onClick={handleClickOPT}>
          <FaCircleDollarToSlot />
        </div>
        <div className={classNameHED} onClick={handleClickHED}>
          <FaScaleBalanced />
        </div>
      </div>
    </div>
  )
}
