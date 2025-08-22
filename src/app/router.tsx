import { Route, Switch, useLocation } from "wouter"
import { ErrorBoundary } from "react-error-boundary"

import { ApiError, AutoLoginError } from "@/api/errors"

import { Home } from "./pages/home"
import { Command } from "./pages/command"
import { Login } from "./pages/auth/login"
import { SignUp } from "./pages/auth/sign-up"
import { ResetPassword } from "./pages/auth/password/reset"
import { ForgotPassword } from "./pages/auth/password/forgot"
import { Unexpected } from "./pages/error/unexpected"
import { Http } from "./pages/error/http"

export function Router() {
  const [_, setLocation] = useLocation()

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
        console.log(error)

        if (error instanceof AutoLoginError) {
          return (
            <Http
              error={error}
              handleRetry={() => {
                resetErrorBoundary()
                setLocation("~/auth/login")
              }}
            >
              Your account was created, but something went wrong while logging
              you in automatically. Please click the button below to go to the
              login page and sign in manually
            </Http>
          )
        }

        if (error instanceof ApiError) {
          return (
            <Http error={error} handleRetry={resetErrorBoundary}>
              Oops, looks like something unexpected went wrong. Don’t worry—it
              happens sometimes. A quick refresh of the page might just fix it.
            </Http>
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
