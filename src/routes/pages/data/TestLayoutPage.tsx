import { useState, type HTMLAttributes, type PropsWithChildren } from "react"
import { Link } from "react-router"

import favoritesAdd from "@/data/localStorage/controllers/favoritesAdd"
import favoritesRemove from "@/data/localStorage/controllers/favoritesRemove"
import favoritesToggle from "@/data/localStorage/controllers/favoritesToggle"

import useSymbols from "@/data/indexDB/hooks/useSymbols"

import ActionSelector from "@/display/controllers/ActionSelector"
import BehaviorSelector from "@/display/controllers/BehaviorSelector"
import ChartSelector from "@/display/controllers/ChartSelector"
import ContentChooser from "@/display/controllers/ContentChooser"
import FavoritesSelector from "@/display/controllers/FavoritesSelector"
import RangeChooser from "@/display/controllers/RangeChooser"
import TradeChooser from "@/display/controllers/TradeChooser"
import ViewChooser from "@/display/controllers/ViewChooser"

import useFavoriteList from "@/data/localStorage/hooks/useFavoriteList"
import useFavoriteSelection from "@/data/localStorage/hooks/useFavoriteSelection"
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
import InfoSelector from "@/display/controllers/InfoSelector"
import { Settings } from "@/display/Settings"
import useActionsSelection from "@/data/localStorage/hooks/useActionsSelection"
import useBehaviorsSelection from "@/data/localStorage/hooks/useBehaviorsSelection"
import useInfosSelection from "@/data/localStorage/hooks/useInfosSelection"
import useActiveSymbols from "@/data/indexDB/hooks/useActiveSymbols"
import useMultipulesSelection from "@/data/localStorage/hooks/useMultipulesSelection"

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

  const actions = useActionsSelection("off")
  const behaviors = useBehaviorsSelection("off")
  const infos = useInfosSelection("off")

  const favorites = useFavoriteSelection("on")
  const multipules = useMultipulesSelection("on")

  const showFavorites = favorites === "on" ? true : false
  const showMultipules = multipules === "on" ? true : false

  const height = useHeightSelection("full")
  const width = useWidthSelection("full")

  const displayList = showFavorites ? favoriteList : symbols

  const displayClassName = `h-${height} w-${width} p-2`

  const settings = {
    view,
    content,
    range,
    trade,
    actions,
    behaviors,
    infos,
    showFavorites,
    showMultipules
  } as Settings

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
          <HeightChooser />
          <div className="divider divider-horizontal" />
          <WidthChooser />
        </div>

        <div className="divider">Views</div>
        <div className="flex flex-row gap-2 items-center flex-wrap p-2">
          <div className="text-xs opacity-50">View</div>
          <ViewChooser />
          <div className="text-xs opacity-50">Content</div>
          <ContentChooser />
          <div className="text-xs opacity-50">Range</div>
          <RangeChooser />
          <div className="text-xs opacity-50">Trade</div>
          <TradeChooser />
          <div className="text-xs opacity-50">Action</div>
          <ActionSelector />
          <div className="text-xs opacity-50">Behavior</div>
          <BehaviorSelector />
          <div className="text-xs opacity-50">Info</div>
          <InfoSelector />
          <div className="text-xs opacity-50">Favorites</div>
          <FavoritesSelector />
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
