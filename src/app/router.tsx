import { Route, Switch } from "wouter"

import { Home } from "./pages/home"
import { Login } from "./pages/login"
import { SignUp } from "./pages/sign-up"
import { ForgotPassword } from "./pages/forgot-password"
import { ResetPassword } from "./pages/reset-password"
import { VerifyToken } from "./pages/verify-token"

export function Router() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/verify-token" component={VerifyToken} />
        <Route path="/reset-password" component={ResetPassword} />
      </Switch>
    </>
  )
}
