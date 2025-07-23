import { Route, Switch } from "wouter"

import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { SignUp } from "./pages/sign-up"
import { RequestToken } from "./pages/request-token"
import { ResetPassword } from "./pages/reset-password"

export function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/request-token" component={RequestToken} />
        <Route path="/reset-password" component={ResetPassword} />
      </Switch>
    </>
  )
}
