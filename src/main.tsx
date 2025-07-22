import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import * as Dom from "@/lib/fp-ts/DOM.ts"
import * as Function from "@/lib/fp-ts/Function"
import * as IOOption from "@/lib/fp-ts/IOOption"

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
