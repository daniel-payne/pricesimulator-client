import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import HomePage from "@/routes/pages/HomePage"
import ErrorPage from "@/routes/pages/ErrorPage"

import "@/data/indexDB/db"

import "./main.css"
import StatusesPage from "./routes/pages/StatusesPage"
import ApplicationPage from "./routes/pages/ApplicationPage"
import TestPage from "./routes/pages/TestPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "/statuses",
    element: <StatusesPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "/application",
    element: <ApplicationPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
  {
    path: "/test",
    element: <TestPage className="h-full w-full" />,
    errorElement: <ErrorPage className="h-full w-full" />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
