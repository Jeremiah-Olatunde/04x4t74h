import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import { App } from "./app"

const root = document.getElementById("root")

if (root === null) {
  throw new Error("Element not found: #root")
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
