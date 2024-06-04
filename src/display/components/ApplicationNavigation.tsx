import useMarketForSymbol from "@/data/indexDB/hooks/useMarketForSymbol"

// import { useQueryState } from "@keldan-systems/state-mutex"
import type { HTMLAttributes, PropsWithChildren } from "react"
import { Link } from "react-router-dom"

type ComponentProps = {
  focus?: string

  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function ApplicationNavigation({ focus, name = "ApplicationNavigation", ...rest }: PropsWithChildren<ComponentProps>) {
  const market = useMarketForSymbol(focus)

  let title
  let subTitle
  let linkTo = "."
  let classTitle
  let classSubTitle

  if (focus === "overview") {
    title = "Markets"
    subTitle = undefined
    linkTo = "/markets/overview"
    classTitle = "fg--heading--active text-xl"
    classSubTitle = ""
  } else {
    title = "Markets"
    subTitle = market?.name
    linkTo = "/markets/overview"
    classTitle = "fg--heading"
    classSubTitle = "fg--heading--active text-xl"
  }

  return (
    <div {...rest} data-component={name}>
      <div className="flex flex-row gap-2 justify-start items-center">
        <Link to="/">
          <img src="/pricesimulator-32.png" alt="Home Page" style={{ height: 32, width: 32 }} />
        </Link>
        <Link to={linkTo}>
          <h1 className={classTitle}>{title}</h1>
        </Link>
        <h1 className={classSubTitle}>{subTitle}</h1>
      </div>
    </div>
  )
}
