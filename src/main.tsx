import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import MarketsContainer from "@/routes/containers/MarketsContainer"
// import CurrentContainer from "@/routes/containers/CurrentContainer"
// import AdministrationContainer from "@/routes/containers/AdministrationContainer"

import HomePage from "@/routes/pages/HomePage"
import ErrorPage from "@/routes/pages/ErrorPage"

import DataPage from "@/routes/pages/DataPage"
import PricesPage from "./routes/pages/PricesPage"

import MarketsPage, { loader as marketsLoader } from "@/routes/pages/MarketsPage"
import MarketPage from "@/routes/pages/MarketPage"

// import ActionsPage from "@/routes/pages/ActionsPage"

// import TradesPage from "@/routes/pages/TradesPage"
// import ScenariosPage, { loader as scenariosLoader } from "@/routes/pages/ScenariosPage"

// import ScenarioPage from "@//routes/pages/ScenarioPage"
// import SettingsPage from "./routes/pages/SettingsPage"
// import StatusPage from "./routes/pages/StatusPage"
// import AccountsPage from "./routes/pages/AccountsPage"

import "@/data/indexDB/db"

import "./main.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  // {
  //   path: "scenarios",
  //   element: <ScenariosPage className="h-full w-full" />,
  //   errorElement: <ErrorPage className="h-full w-full" />,
  //   loader: scenariosLoader,
  // },
  {
    path: "markets/:focus",
    element: <MarketsContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      { index: true, element: <MarketsPage className="h-full w-full" />, loader: marketsLoader },
      {
        path: "detail",
        element: <MarketPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
    ],
  },
  // {
  //   path: "scenario/:id",
  //   element: <ScenarioPage className="h-full w-full" />,
  //   errorElement: <ErrorPage className="h-full w-full" />,
  // },
  // {
  //   path: "current",
  //   element: <CurrentContainer className="h-full w-full" />,
  //   errorElement: <ErrorPage className="h-full w-full" />,

  //   children: [
  //     {
  //       path: "Accounts",
  //       element: <AccountsPage className="h-full w-full" />,
  //       errorElement: <ErrorPage className="h-full w-full" />,
  //     },
  //     {
  //       path: "trades",
  //       element: <TradesPage className="h-full w-full" />,
  //       errorElement: <ErrorPage className="h-full w-full" />,
  //     },
  //   ],
  // },
  // {
  //   path: "admin",
  //   element: <AdministrationContainer className="h-full w-full" />,
  //   errorElement: <ErrorPage className="h-full w-full" />,

  //   children: [
  //     {
  //       path: "Settings",
  //       element: <SettingsPage className="h-full w-full" />,
  //       errorElement: <ErrorPage className="h-full w-full" />,
  //     },
  //     {
  //       path: "status",
  //       element: <StatusPage className="h-full w-full" />,
  //       errorElement: <ErrorPage className="h-full w-full" />,
  //     },
  //   ],
  // },
  {
    path: "prices/:symbol",
    element: <PricesPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "test",
    errorElement: <ErrorPage className="h-full w-full" />,
    children: [
      // {
      //   path: "actions",
      //   element: <ActionsPage className="h-full w-full" />,
      //   errorElement: <ErrorPage className="h-full w-full" />,
      // },
      {
        path: "data",
        element: <DataPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
