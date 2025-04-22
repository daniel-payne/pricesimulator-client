import { useState, type HTMLAttributes, type PropsWithChildren } from "react"
import { Link } from "react-router"



import ActionSelector from "@/display/controllers/ActionSelector"


import ContentChooser from "@/display/controllers/ContentChooser"
import FavoritesSelector from "@/display/controllers/FavoritesSelector"
import RangeChooser from "@/display/controllers/RangeChooser"
import TradeChooser from "@/display/controllers/TradeChooser"
import ViewChooser from "@/display/controllers/ViewChooser"

import useFavoriteList from "@/data/localStorage/hooks/useFavoriteList"
import useFavoritesSelection from "@/data/localStorage/hooks/useFavoritesSelection"
import SymbolManager from "@/display/coordinators/SymbolManager"
import SymbolSelector from "@/display/components/SymbolSelector"
import CodeSelector from "@/display/components/CodeSelector"
import useContentSelection from "@/data/localStorage/hooks/useContentSelection"
import useViewSelection from "@/data/localStorage/hooks/useViewSelection"
import useRangeSelection from "@/data/localStorage/hooks/useRangeSelection"
import HeightChooser from "@/display/controllers/HeightChooser"
import WidthChooser from "@/display/controllers/WidthChooser"
import useHeightSelection from "@/data/localStorage/hooks/useHeightSelection"
import useWidthSelection from "@/data/localStorage/hooks/useWidthSelection"
import useTradeSelection from "@/data/localStorage/hooks/useTradeSelection"
import SummarySelector from "@/display/controllers/SummarySelector"
import useSummarySelection from "@/data/localStorage/hooks/useSummarySelection"
import ControllerSelector from "@/display/controllers/ControllerSelector"

import useActionsSelection from "@/data/localStorage/hooks/useActionsSelection"
import useControllerSelection from "@/data/localStorage/hooks/useControllerSelection"

import useActiveSymbols from "@/data/indexDB/hooks/useActiveSymbols"
import useMultipulesSelection from "@/data/localStorage/hooks/useMultipulesSelection"

import type { Settings } from "@/display/Settings"
import MultipulesSelector from "@/display/controllers/MultipulesSelector"
import useDescriptionsSelection from "@/data/localStorage/hooks/useDescriptionsSelection"
import DescriptionsSelector from "@/display/controllers/DescriptionsSelector"
import ExpandedSelector from "@/display/controllers/ExpandedSelector"
import useExpandedSelection from "@/data/localStorage/hooks/useExpandedSelection"



type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function TestLayoutPage({ name = "TestLayoutPage", ...rest }: PropsWithChildren<ComponentProps>) {
  const [symbol, setSymbol] = useState<string>("^SPX")
  const [code, setCode] = useState<string>("USD")

  const symbols = useActiveSymbols()

  const favoriteList = useFavoriteList()

  const view = useViewSelection("expanded")
  const content = useContentSelection("form")
  const range = useRangeSelection("1m")
  const trade = useTradeSelection("contract")

  const showExpanded = useExpandedSelection(false)

  const showSummary = useSummarySelection(false)
  const showController = useControllerSelection(false)
  const showAction = useActionsSelection(false)

  const showFavorites = useFavoritesSelection(false)
  const showMultipules = useMultipulesSelection(false)
  const showDescriptions = useDescriptionsSelection(false)


  const height = useHeightSelection("full")
  const width = useWidthSelection("full")

  const settings = {
    view,
    content: showExpanded ? content : 'none',
    range,
    trade,

    showExpanded,
    showSummary,
    showController,
    showAction,

    showFavorites,
    showMultipules,
    showDescriptions
  } as Settings

  const displayList = showFavorites ? favoriteList : symbols

  const displayClassName = `h-${showExpanded ? height : 'auto'} w-${showExpanded ? width : 'auto'} p-2`

  return (
    <div {...rest} data-component={name}>
      <div className="p-2 flex flex-col gap-2  h-full w-full">

        <div className=" flex flex-row gap-2 items-center justify-between">
          <div className="flex flex-row gap-2 mt-2 items-center flex-wrap">
            <Link to="/">
              <img src="/pricesimulator-32.png" alt="Home Page" style={{ height: 32, width: 32 }} />
            </Link>
            <Link to="/test">
              <h1 className="text-md text-secondary">Tests</h1>
            </Link>
            <h1 className="text-xl text-secondary">Application Layout</h1>
          </div>
          <div className="flex flex-row gap-2 mt-2 items-center flex-wrap">
            <SymbolSelector symbol={symbol} onSelectionChanged={setSymbol} />
            <CodeSelector code={code} onSelectionChanged={setCode} />
          </div>

        </div>

        <div className="divider">Views</div>
        <div className="flex flex-row gap-2 items-center flex-wrap p-2">
          <ExpandedSelector />
          <div className="divider divider-horizontal" />
          <HeightChooser />
          <div className="divider divider-horizontal" />
          <WidthChooser />
        </div>

        <div className="divider">Views</div>
        <div className="flex flex-row gap-2 items-center flex-wrap p-2">
          {/* <ViewChooser />
          <div className="divider divider-horizontal" /> */}
          <ContentChooser />
          <div className="divider divider-horizontal" />
          <RangeChooser />
          <div className="divider divider-horizontal" />
          <TradeChooser />
          <div className="divider divider-horizontal" />
          <ActionSelector />
          <ControllerSelector />
          <SummarySelector />
          <div className="divider divider-horizontal" />
          <FavoritesSelector />
          <MultipulesSelector />
          <DescriptionsSelector />
          {/* <pre className="p-2 ">
            {JSON.stringify(settings, null, 2)}
          </pre> */}
        </div>

        <div className="divider">Components {displayClassName}</div>
        <div className="flex-auto min-h-0 flex flex-row flex-wrap">
          {displayList?.map((symbol) => (
            <div className={displayClassName} key={symbol}>
              <SymbolManager className="h-full w-full" symbol={symbol} settings={settings} />
            </div>
          ))}
        </div>


      </div>
    </div>
  )
}
