import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import StatusContainer from "./routes/containers/StatusContainer"
import TestContainer from "@/routes/containers/TestContainer"

import HomePage from "@/routes/pages/HomePage"
import ErrorPage from "@/routes/pages/ErrorPage"

import ScenariosPage, { loader as scenariosLoader } from "./routes/pages/ScenariosPage"
import MarketsPage from "./routes/pages/MarketsPage"
import TradesPage from "./routes/pages/TradesPage"

import MarketPage, { loader as marketLoader } from "./routes/pages/MarketPage"
import TestOnePage, { loader as testOneLoader } from "@/routes/pages/TestOnePage"
import ScenarioPage, { loader as scenarioLoader } from "@//routes/pages/ScenarioPage"

import "@/data/indexDB/db"

import "./main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "status",
    element: <StatusContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      { index: true, element: <HomePage className="h-full w-full" /> },
      {
        path: "scenarios",
        element: <ScenariosPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: scenariosLoader,
      },
      {
        path: "markets",
        element: <MarketsPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
      {
        path: "trades",
        element: <TradesPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
      {
        path: "market/:symbol",
        element: <MarketPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: marketLoader,
      },
      {
        path: "scenario/:id",
        element: <ScenarioPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: scenarioLoader,
      },
    ],
  },
  {
    path: "test",
    element: <TestContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      { index: true, element: <HomePage className="h-full w-full" /> },
      {
        path: "one",
        element: <TestOnePage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: testOneLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
