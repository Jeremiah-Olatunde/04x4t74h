import path from "node:path"

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      Array: path.resolve(__dirname, "./src/lib/fp-ts/Array.ts"),
      Boolean: path.resolve(__dirname, "./src/lib/fp-ts/Boolean.ts"),
      DOM: path.resolve(__dirname, "./src/lib/fp-ts/DOM.ts"),
      Function: path.resolve(__dirname, "./src/lib/fp-ts/Function.ts"),
      IOOption: path.resolve(__dirname, "./src/lib/fp-ts/IOOption.ts"),
      Option: path.resolve(__dirname, "./src/lib/fp-ts/Option.ts"),
    },
  },
})
