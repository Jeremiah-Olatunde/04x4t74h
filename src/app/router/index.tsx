import { Route, Switch, useLocation } from "wouter"
import { ErrorBoundary } from "react-error-boundary"

import { ApiError, AutoLoginError } from "@/api/errors"
import { Unexpected, Http } from "@/components/error"

import { Business } from "@/app/pages/business/[businessId]/home/[page]"
import { ReviewCreate } from "@/app/pages/business/[businessId]/reviews/create"

import { ForgotPassword } from "@/app/pages/auth/password/forgot"
import { Home } from "@/app/pages/home"
import { Login } from "@/app/pages/auth/login"
import { ResetPassword } from "@/app/pages/auth/password/reset"
import { SignUp } from "@/app/pages/auth/sign-up"

export function Router() {
  const [_, setLocation] = useLocation()

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => {
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
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />

        <Route path="/business/:businessId/home/:page" component={Business} />
        <Route
          path="/business/:businessId/reviews/create"
          component={ReviewCreate}
        />

        <Route path="/auth" component={Login} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/sign-up" component={SignUp} />
        <Route path="/auth/password" component={ForgotPassword} />
        <Route path="/auth/password/forgot" component={ForgotPassword} />
        <Route path="/auth/password/reset" component={ResetPassword} />

        <Route>page not found</Route>
      </Switch>
    </ErrorBoundary>
  )
}
