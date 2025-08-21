import { Route, Switch } from "wouter"
import { ErrorBoundary } from "react-error-boundary"

import { ApiError } from "@/api/errors"

import { Home } from "./pages/home"
import { Command } from "./pages/command"
import { Login } from "./pages/auth/login"
import { SignUp } from "./pages/auth/sign-up"
import { ResetPassword } from "./pages/auth/password/reset"
import { ForgotPassword } from "./pages/auth/password/forgot"
import { Unexpected } from "./pages/error/unexpected"
import { Http } from "./pages/error/http"

export function Router() {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        console.log(error)
        if (error instanceof ApiError) {
          return (
            <Http
              error={error}
              handleRetry={resetErrorBoundary}
              handleReport={() => {}}
            />
          )
        }

        return <Unexpected />
      }}
    >
      <Switch>
        <Route path="/" component={Command} />
        <Route path="/home" component={Home} />
        <Route path="/auth" nest>
          <Route path="/" component={Login} />
          <Route path="/login" component={Login} />
          <Route path="/sign-up" component={SignUp} />
          <Route path="/password" nest>
            <Route path="/" component={ForgotPassword} />
            <Route path="/forgot" component={ForgotPassword} />
            <Route path="/reset" component={ResetPassword} />
          </Route>
        </Route>
        <Route>page not found</Route>
      </Switch>
    </ErrorBoundary>
  )
}
