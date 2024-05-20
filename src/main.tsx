import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import StatusContainer from "@/routes/containers/StatusContainer"
import CurrentContainer from "@/routes/containers/CurrentContainer"
import AdministrationContainer from "@/routes/containers/AdministrationContainer"

import HomePage from "@/routes/pages/HomePage"
import ErrorPage from "@/routes/pages/ErrorPage"
import TestPage from "@/routes/pages/TestPage"
import CategoriesPage, { loader as categoriesLoader } from "@/routes/pages/CategoriesPage"
import TradesPage from "@/routes/pages/TradesPage"
import ScenariosPage, { loader as scenariosLoader } from "@/routes/pages/ScenariosPage"
import MarketPage from "@/routes/pages/MarketPage"
import ScenarioPage from "@//routes/pages/ScenarioPage"

import "@/data/indexDB/db"

import "./main.css"
import SettingsPage from "./routes/pages/SettingsPage"
import StatusPage from "./routes/pages/StatusPage"
import AccountsPage from "./routes/pages/AccountsPage"
import DataPage, { loader as dataLoader } from "./routes/pages/DataPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "/scenarios",
    element: <ScenariosPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
    loader: scenariosLoader,
  },
  {
    path: "status",
    element: <StatusContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      { index: true, element: <HomePage className="h-full w-full" /> },
      {
        path: "categories",
        element: <CategoriesPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: categoriesLoader,
      },
      {
        path: "market/:symbol",
        element: <MarketPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },

      {
        path: "scenario/:id",
        element: <ScenarioPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
    ],
  },
  {
    path: "current",
    element: <CurrentContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      {
        path: "Accounts",
        element: <AccountsPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
      {
        path: "trades",
        element: <TradesPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
    ],
  },
  {
    path: "admin",
    element: <AdministrationContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      {
        path: "Settings",
        element: <SettingsPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
      {
        path: "status",
        element: <StatusPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
    ],
  },
  {
    path: "test",
    element: <TestPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "data/:symbol",
    element: <DataPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
    loader: dataLoader,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
