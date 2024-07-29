import { ChangeEvent, useState } from "react"

import { useDataState } from "@keldan-systems/state-mutex"

import RangeChooser from "@/display/components/choosers/RangeChooser"
import TradeChooser from "@/display/components/choosers/TradeChooser"
import ViewChooser from "@/display/components/choosers/ViewChooser"
import ContentChooser from "@/display/components/choosers/ContentChooser"
import WidthChooser from "@/display/components/choosers/WidthChooser"
import HeightChooser from "@/display/components/choosers/HeightChooser"

import MarketFooter from "@/display/components/MarketFooter"
import MarketHeader from "@/display/components/MarketHeader"
import MarketOverview from "@/display/components/MarketOverview"

import ActionSelector from "@/display/components/selectors/ActionSelector"
import BehaviorSelector from "@/display/components/selectors/BehaviorSelector"
import ChartSelector from "@/display/components/selectors/ChartSelector"
import FavoritesSelector from "@/display/components/selectors/FavoritesSelector"

import TimerTest from "@/display/elements/test/TimerTest"
import MarketsTest from "@/display/elements/test/MarketsTest"

import type { HTMLAttributes, PropsWithChildren } from "react"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TestPage({ name = "TestPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const [displayFirst, setDisplayFirst] = useState("TimerTest")
  const [displaySecond, setDisplaySecond] = useState("NoneSecond")

  const behaviors = useDataState<string>("behaviors")
  const actions = useDataState<string>("actions")
  const chart = useDataState<string>("chart")
  const form = useDataState<string>("form")
  const trade = useDataState<string>("trade")

  const onOptionChangeFirst = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplayFirst(event.target.value)
  }

  const onOptionChangeSecond = (event: ChangeEvent<HTMLInputElement>) => {
    setDisplaySecond(event.target.value)
  }

  return (
    <div {...rest} data-component={name}>
      <div className="h-full w-full flex flex-col gap-2">
        <div className="flex flex-row gap-4 p-2 justify-center flex-wrap">
          <HeightChooser />
          <div className="divider divider-horizontal" />
          <WidthChooser />
          <div className="divider divider-horizontal" />
          <RangeChooser />
          <div className="divider divider-horizontal" />
          <ViewChooser />
          <div className="divider divider-horizontal" />
          <ContentChooser />
          <div className="divider divider-horizontal" />
          <TradeChooser />
          <div className="divider divider-horizontal" />
          <BehaviorSelector />
          <div className="divider divider-horizontal" />
          <ActionSelector />
          <div className="divider divider-horizontal" />
          <ChartSelector />
          <div className="divider divider-horizontal" />
          <FavoritesSelector />
        </div>
        <div className="flex flex-row gap-4 p-2">
          <div className="flex flex-row gap-2">
            <OptionButton value="NoneFirst" label="None" option={displayFirst} onChange={onOptionChangeFirst} />
            <OptionButton value="TimerTest" option={displayFirst} onChange={onOptionChangeFirst} />
            <OptionButton value="ScenarioTest" option={displayFirst} onChange={onOptionChangeFirst} />
          </div>
        </div>
        <div className="flex-auto overflow-auto">
          {displayFirst === "TimerTest" && <TimerTest />}
          {displayFirst !== "NoneFirst" && displaySecond !== "NoneSecond" && <div className="divider" />}
          {displaySecond === "MarketHeader" && (
            <MarketsTest className="h-full" addBorder={true}>
              <MarketHeader className="h-full" showBehaviors={behaviors === "on"} />
            </MarketsTest>
          )}
          {displaySecond === "MarketFooter" && (
            <MarketsTest className="h-full" addBorder={true}>
              <MarketFooter className="h-full" showActions={actions === "on"} tradeType={trade} />
            </MarketsTest>
          )}
          {displaySecond === "MarketOverview" && (
            <MarketsTest className="h-full" addBorder={true}>
              <MarketOverview
                className="h-full"
                showBehaviors={behaviors === "on"}
                showActions={actions === "on"}
                showChart={chart === "on"}
                showForm={form === "on"}
              />
            </MarketsTest>
          )}
        </div>
        <div className="flex flex-row gap-4 p-2">
          <div className="flex flex-row gap-2">
            <OptionButton value="NoneSecond" label="None" option={displaySecond} onChange={onOptionChangeSecond} />
            <OptionButton value="MarketHeader" option={displaySecond} onChange={onOptionChangeSecond} />
            <OptionButton value="MarketFooter" option={displaySecond} onChange={onOptionChangeSecond} />
            <OptionButton value="MarketOverview" option={displaySecond} onChange={onOptionChangeSecond} />
          </div>
        </div>
      </div>
    </div>
  )
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const OptionButton = ({ value, label, option, onChange }: any) => {
  return (
    <>
      <input className="radio checked:bg-primary" type="radio" name={value} value={value} id={value} checked={option === value} onChange={onChange} />
      <label htmlFor={value}>{label ?? value}</label>
    </>
  )
}
