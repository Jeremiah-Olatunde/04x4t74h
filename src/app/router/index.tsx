import { Redirect, Route, Switch, useLocation } from "wouter"
import { ErrorBoundary } from "react-error-boundary"

import { ApiError } from "@/lib/errors/api"
import { AutoLoginError } from "@/lib/errors/ui"
import { Unexpected, Http } from "@/components/error"

import { Business } from "@/app/pages/business/[businessId]/home/[page]"
import { ReviewCreate } from "@/app/pages/business/[businessId]/reviews/create"

import { Categories, Cities, Home, Tag, Tags } from "@/app/pages/discover"
import { Login } from "@/app/pages/auth/login"
import { PasswordForgot } from "@/app/pages/auth/password/forgot"
import { SignUp } from "@/app/pages/auth/sign-up"
import { Search } from "../pages/search"
import { Recommendations } from "../pages/recommendations"

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
        <Route path="/" component={() => <Redirect to="/discover/home" />} />

        <Route path="/discover/home" component={Home} />

        <Route path="/discover/tags" component={Tags} />
        <Route path="/discover/tags/:tagName" component={Tag} />

        <Route path="/discover/cities" component={Cities} />
        <Route path="/discover/categories" component={Categories} />

        <Route path="/business/:businessId/home/:page" component={Business} />
        <Route
          path="/business/:businessId/reviews/create"
          component={ReviewCreate}
        />

        <Route path="/auth" component={Login} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/sign-up" component={SignUp} />
        <Route path="/auth/password" component={PasswordForgot} />
        <Route path="/auth/password/forgot" component={PasswordForgot} />

        <Route path="/search" component={Search} />

        <Route path="/recommendations" component={Recommendations} />

        <Route>page not found</Route>
      </Switch>
    </ErrorBoundary>
  )
}
