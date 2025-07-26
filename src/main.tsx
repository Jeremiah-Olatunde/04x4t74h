import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import * as Dom from "DOM"
import * as Function from "Function"
import * as IOOption from "IOOption"

import "./index.css"
import { App as App_ } from "./app"

export function App() {
  return (
    <StrictMode>
      <App_ />
    </StrictMode>
  )
}

Function.pipe(
  document,
  Dom.querySelector("#root"),
  IOOption.map(createRoot),
  IOOption.map((root) => root.render(<App />)),
  IOOption.unsafeExpect("Element not found: [#root]"),
)
