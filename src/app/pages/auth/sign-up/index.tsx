import { useLocation } from "wouter"
import { useEffect, useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { useErrorBoundary } from "react-error-boundary"

import { AutoLoginError } from "@/lib/errors/ui"
import { ApiError, BadRequest, Conflict } from "@/lib/errors/api"

import { FlagNg } from "@/assets/icons/flag-ng"

import * as Form from "@/components/form"

import { LogoText } from "@/components/logo"
import { LinkText } from "@/components/link"
import * as Placeholder from "@/components/placeholder"

import * as RemoteData from "@/lib/remote-data"

import { login } from "@/api/endpoints/auth/login"
import { register } from "@/api/endpoints/auth/register"

type FormValues = {
  name: string
  email: string
  telephone: string
  password: string
}

const defaultValues: FormValues = {
  name: "",
  email: "",
  telephone: "",
  password: "",
}

export function ComingSoon() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Sign Up</Placeholder.Title>
        <Placeholder.Subtitle>
          Create an account on Plazzaa
        </Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Our sign-up experience isn’t quite ready yet, but it will be available
        shortly. Soon you’ll be able to create an account, save your favorite
        businesses, and unlock more personalized features. Check back soon — we
        can’t wait to welcome you in.
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}

export function SignUp() {
  const [_, setLocation] = useLocation()
  const { showBoundary } = useErrorBoundary()
  const [passwordVisible, setPasswordVisible] = useState(false)

  type Status = RemoteData.RemoteData<null, null>
  const [statusSignUp, setStatusSignUp] = useState<Status>(RemoteData.initial)
  const [statusLogin, setStatusLogin] = useState<Status>(RemoteData.initial)

  type Banner =
    | "EmailTaken"
    | "TelephoneTaken"
    | "SignUpComplete"
    | "PostSignUpLoginComplete"
    | "PostSignUpLoginFailure"
    | "InvalidData"
  const [banner, setBanner] = useState<null | Banner>(null)

  const { control, handleSubmit, setError } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  useEffect(() => {
    RemoteData.map(statusLogin, () =>
      setTimeout(setLocation, 1000, "~/discover"),
    )
  }, [statusLogin])

  async function onSubmit(formValues: FormValues) {
    setBanner(null)
    setStatusSignUp(RemoteData.pending)

    try {
      await register(formValues)
      setStatusSignUp(RemoteData.success(null))
      setBanner("SignUpComplete")

      try {
        setStatusLogin(RemoteData.pending)
        await login(formValues)
        setStatusLogin(RemoteData.success(null))
        setBanner("PostSignUpLoginComplete")
      } catch (error) {
        if (error instanceof ApiError) {
          throw new AutoLoginError(error.code, error.text, error.message)
        }

        throw error
      }
    } catch (error) {
      setStatusSignUp(RemoteData.failure(null))

      if (error instanceof Conflict) {
        const field = error.details.field

        const isEmail = field === "email"
        const isTelephone = field === "telephone"

        if (!(isEmail || isTelephone)) {
          throw error
        }

        const options = { shouldFocus: true }
        const fieldError = { types: { conflict: error.message } }
        setError(field, fieldError, options)
        setBanner(field === "email" ? "EmailTaken" : "TelephoneTaken")

        return
      }

      if (error instanceof BadRequest) {
        const field = error.details.field

        const isEmail = field === "email"
        const isTelephone = field === "telephone"
        const isPassword = field === "password"

        if (!(isEmail || isTelephone || isPassword)) {
          throw error
        }

        const options = { shouldFocus: true }
        const fieldError = { types: { conflict: error.message } }
        setError(field, fieldError, options)
        setBanner("InvalidData")

        return
      }

      showBoundary(error)
      throw error
    }
  }

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <LogoText color="purple" size="lg" />

      <div className="h-8" />

      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Group.Root name="group-one">
          <Form.Group.Title title="Sign In" description="Create an account!" />

          {banner === "EmailTaken" && <Form.Banner.EmailTaken />}
          {banner === "TelephoneTaken" && <Form.Banner.TelephoneTaken />}
          {banner === "SignUpComplete" && <Form.Banner.SignUpComplete />}
          {banner === "PostSignUpLoginComplete" && (
            <Form.Banner.PostSignUpLoginComplete />
          )}
          {banner === "PostSignUpLoginFailure" && (
            <Form.Banner.PostSignUpLoginFailure />
          )}
          {banner === "InvalidData" && <Form.Banner.InvalidData />}

          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required",
              },
              pattern: {
                value: /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/,
                message: "Invalid name",
              },
            }}
            render={({ field, fieldState }) => {
              const errorMap = Object.values(fieldState.error?.types ?? {})
              const errors = errorMap.filter((e) => typeof e === "string")

              return (
                <Form.Field.Root>
                  <Form.Field.Label htmlFor={field.name}>
                    Full name
                  </Form.Field.Label>
                  <Form.Control.Input
                    {...field}
                    id={field.name}
                    autoComplete="name"
                    color={fieldState.invalid ? "red" : "neutral"}
                    placeholder="Enter your full name"
                    type="text"
                  />
                  <Form.Field.Errors errors={errors} />
                </Form.Field.Root>
              )
            }}
          />

          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required",
              },
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email",
              },
            }}
            render={({ field, fieldState }) => {
              const errorMap = Object.values(fieldState.error?.types ?? {})
              const errors = errorMap.filter((e) => typeof e === "string")

              return (
                <Form.Field.Root>
                  <Form.Field.Label htmlFor={field.name}>
                    Email Address
                  </Form.Field.Label>
                  <Form.Control.Input
                    {...field}
                    id={field.name}
                    autoComplete="email"
                    color={fieldState.invalid ? "red" : "neutral"}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Form.Field.Errors errors={errors} />
                </Form.Field.Root>
              )
            }}
          />

          <Controller
            name="telephone"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required",
              },
              pattern: {
                value: /^0(7|8|9)\d{9}$/,
                message: "Invalid phone number",
              },
            }}
            render={({ field, fieldState }) => {
              const errorMap = Object.values(fieldState.error?.types ?? {})
              const errors = errorMap.filter((e) => typeof e === "string")

              return (
                <Form.Field.Root>
                  <Form.Field.Label htmlFor={field.name}>
                    Phone Number
                  </Form.Field.Label>
                  <Form.Control.Input
                    {...field}
                    id={field.name}
                    autoComplete="tel-national"
                    color={fieldState.invalid ? "red" : "neutral"}
                    type="tel"
                    placeholder="Enter your phone number"
                  >
                    <div className="cursor-pointer rounded-sm bg-neutral-200 px-1.5 py-0.5">
                      <FlagNg className="size-6" />
                    </div>
                  </Form.Control.Input>
                  <Form.Field.Errors errors={errors} />
                </Form.Field.Root>
              )
            }}
          />

          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Required" },
              minLength: { value: 10, message: "Too short" },
              validate: {
                noWhitespace: function excludeWhitespace(
                  v: string,
                ): string | true {
                  const message = "Spaces not allowed"
                  return /^\S+$/.test(v) || message
                },
                oneDigit: function (v: string): true | string {
                  const message = "Must have a digit"
                  return /[0-9]/.test(v) || message
                },

                oneSymbol: function (v: string): string | true {
                  const message = "Must have a symbol"
                  return /[^a-zA-Z0-9\s]/.test(v) || message
                },
                oneUppercase: function (v: string): string | true {
                  const message = "Must have an uppercase"
                  return /[A-Z]/.test(v) || message
                },

                oneLowercase: function (v: string): string | true {
                  const message = "Must have a lowercase"
                  return /[a-z]/.test(v) || message
                },
              },
            }}
            render={({ field, fieldState }) => {
              const errorMap = Object.values(fieldState.error?.types ?? {})
              const errors = errorMap.filter((e) => typeof e === "string")

              return (
                <Form.Field.Root>
                  <Form.Field.Label htmlFor={field.name}>
                    Password
                  </Form.Field.Label>
                  <Form.Control.Input
                    {...field}
                    id={field.name}
                    autoComplete="current-password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    color={fieldState.invalid ? "red" : "neutral"}
                  >
                    <Form.Button.TogglePassword
                      visible={passwordVisible}
                      onVisibleChange={setPasswordVisible}
                    />
                  </Form.Control.Input>

                  <Form.Field.Errors errors={errors} />
                </Form.Field.Root>
              )
            }}
          />

          {RemoteData.fold(statusSignUp, {
            onInitial: (): ReactNode => <Form.Button.SignUp />,
            onPending: (): ReactNode => <Form.Button.Pending />,
            onFailure: (): ReactNode => <Form.Button.TryAgain />,
            onSuccess: (): ReactNode => null,
          })}

          {RemoteData.fold(statusLogin, {
            onInitial: (): ReactNode => null,
            onFailure: (): ReactNode => <Form.Button.TryAgain />,
            onPending: (): ReactNode => <Form.Button.Pending />,
            onSuccess: (): ReactNode => <Form.Button.Success />,
          })}

          <div className="flex items-center justify-center gap-1">
            <span className="font-sora text-xs text-neutral-400">
              Already have an account?
            </span>

            <LinkText href="/auth/login">Login</LinkText>
          </div>
        </Form.Group.Root>
      </Form.Root>
    </section>
  )
}
