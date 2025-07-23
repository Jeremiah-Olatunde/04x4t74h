import { Route, Switch } from "wouter"

import { Home } from "./pages/home"

export function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
      </Switch>
    </>
  )
}
