import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import DataContainer from "@/routes/containers/DataContainer"
// import GameContainer from "@/routes/containers/GameContainer"

import HomePage from "@/routes/pages/HomePage"
import ErrorPage from "@/routes/pages/ErrorPage"
import MarketsPage from "@/routes/pages/MarketsPage"

import "./main.css"
import MarketPage, { loader as marketLoader } from "./routes/pages/MarketPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataContainer className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,

    children: [
      { index: true, element: <HomePage className="h-full w-full" /> },
      {
        path: "markets",
        element: <MarketsPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
      },
      {
        path: "markets/:symbol",
        element: <MarketPage className="h-full w-full" />,
        errorElement: <ErrorPage className="h-full w-full" />,
        loader: marketLoader,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
