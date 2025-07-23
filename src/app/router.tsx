import { Route, Switch } from "wouter"

import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { SignUp } from "./pages/sign-up"
import { ForgotPassword } from "./pages/forgot-password"
import { ResetPassword } from "./pages/reset-password"

export function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/auth" nest>
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/password" nest>
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/reset" component={ResetPassword} />
          </Route>
        </Route>
      </Switch>
    </>
  )
}
