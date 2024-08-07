import { Link } from "react-router-dom"

import type { HTMLAttributes, PropsWithChildren } from "react"
import useTimer from "@/data/indexDB/hooks/useTimer"
import formatTimestamp from "@/utilities/formatTimestamp"
import formatTimestampDay from "@/utilities/formatTimestampDay"

import { useDataState } from "@keldan-systems/state-mutex"
import resetTrading from "@/data/indexDB/controllers/reset/resetTrading"

type ComponentProps = {
  name?: string
} & HTMLAttributes<HTMLDivElement>

export default function HomePage({ name = "HomePage", ...rest }: PropsWithChildren<ComponentProps>) {
  const timer = useTimer()

  const applicationStatus = useDataState<any>("APPLICATION-STATUS")

  const { currentDay } = timer ?? {}

  return (
    <div {...rest} data-component={name}>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-error font-bold text-lg">Warning</h3>
          <p className="py-4">
            You will lose all your trades and be taken back to January 1970 with another <strong className="text-success">$5,000</strong> to start trading with.
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Cancel</button>
              <button className="ms-2 btn btn-error" onClick={resetTrading}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </dialog>
      <div className="p-6 h-full w-full flex flex-col gap-2 justify-center">
        {/* heading */}
        <div className="mt-6 h-32 flex flex-col gap-4 justify-center items-center">
          <div className="text-6xl font-extrabold leading-none tracking-tight text-primary">Price Simulator</div>
          <div className="text-2xl font-extrabold leading-none tracking-tight text-gray-500">
            <span>A game to explain how trading in financial markets works.</span>
          </div>
        </div>
        {/* main */}
        <div className="flex-auto  flex flex-col gap-8 justify-center items-center ">
          <div className=" flex flex-row gap-8 justify-center items-center">
            <div className="card w-96 h-80 bg-base-200 shadow-xl overflow-hidden">
              <div className="card-body">
                <h4 className="card-title truncate">Scenarios</h4>
                <p className="h-8 text-gray-500">
                  <span>Using pre-defined scenarios that introduce the skills needed to succeed in this trading game.</span>
                  <div className="text-xs mt-4">Time will stop between each scenario to give you a chance to review the knowledge acquired.</div>
                </p>
              </div>
              <div className="card-actions justify-end p-4">
                <Link to="/scenarios">
                  <button className="btn btn-primary">Work through the tutorials</button>
                </Link>
              </div>
            </div>

            <div className="card w-96 h-80 bg-base-200 shadow-xl overflow-hidden">
              <div className="card-body">
                <h4 className="card-title truncate">Markets</h4>
                <p className="h-8 text-gray-500">
                  <div>Take me back to 1970, and see how well you can grow a starting investment of $1,000</div>
                  <div className="text-xs mt-4">
                    <span>As its not real money, you just hit this</span>
                    {/* <Link to="/reset"> */}
                    <button className="btn btn-xs btn-error mx-2" onClick={() => document?.getElementById("my_modal_1")?.showModal()}>
                      button
                    </button>
                    {/* </Link> */}
                    <span>to start over again anytime.</span>
                  </div>
                  <div className="text-xs mt-4">
                    You will retire on 5 May 2023, so you have about 5 hours in the game to make your fortune once the clock starts running.
                  </div>
                </p>
              </div>
              <div className="card-actions justify-end p-4">
                <Link to="/markets/overview">
                  <button className="btn btn-primary">Dive in and start trading</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="font-extrabold leading-none tracking-tight text-gray-500">
            <span className="text-sm">Currently in the game it is &nbsp;</span>
            <span className="text-sm">{formatTimestampDay(currentDay)}, </span>
            <span className="text-lg">{formatTimestamp(currentDay)}</span>
          </div>
          <div className="font-light leading-none tracking-tight text-gray-500">
            <span>{applicationStatus?.message}</span>
          </div>
        </div>
        {/* aside */}
        <div className="h-32 flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-2 text-md font-extrabold leading-none tracking-tight text-gray-500 text-center">
            <div>This is a game, set in 1970, and is not intended to be financial advice.</div>
            <div>There are no GDPR wavers as we don't use cookies, once loaded, the game runs locally.</div>
          </div>
        </div>
      </div>
    </div>
  )
}
