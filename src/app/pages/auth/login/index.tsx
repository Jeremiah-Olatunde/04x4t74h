import { useEffect, useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"
import { useErrorBoundary } from "react-error-boundary"
import { useLocation } from "wouter"

import { BadRequest, Unauthorized } from "@/lib/errors/api"
import * as RemoteData from "@/lib/remote-data"

import * as Form from "@/components/form"

import { LogoText } from "@/components/logo"
import { LinkText } from "@/components/link"

import { login } from "@/api/endpoints/auth/login"

type FormValues = {
  email: string
  password: string
}

const defaultValues = {
  email: "",
  password: "",
}

export function Login() {
  const [_, setLocation] = useLocation()
  const { showBoundary } = useErrorBoundary()
  const [passwordVisible, setPasswordVisible] = useState(false)

  type Status = RemoteData.RemoteData<null, null>
  const [status, setStatus] = useState<Status>(RemoteData.initial)

  type Banner = "LoginComplete" | "InvalidData" | "InvalidCredentials"
  const [banner, setBanner] = useState<null | Banner>(null)

  const { control, handleSubmit, setError } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  useEffect(() => {
    RemoteData.map(status, () => setTimeout(setLocation, 1000, "~/home"))
  }, [status])

  async function onSubmit(formValues: FormValues) {
    setBanner(null)
    setStatus(RemoteData.pending)

    try {
      await login(formValues)
      setStatus(RemoteData.success(null))
      setBanner("LoginComplete")
    } catch (error) {
      setStatus(RemoteData.failure(null))
      if (error instanceof BadRequest) {
        const field = error.details.field

        const isEmail = field === "email"

        if (!isEmail) {
          throw error
        }

        const options = { shouldFocus: true }
        const fieldError = { types: { invalid: error.message } }
        setError(field, fieldError, options)
        setBanner("InvalidData")

        return
      }

      if (error instanceof Unauthorized) {
        setBanner("InvalidCredentials")

        return
      }

      showBoundary(error)
      throw error
    }
  }

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <LogoText size="lg" color="purple" />

      <div className="h-8" />

      <Form.Root onSubmit={handleSubmit(onSubmit)}>
        <Form.Group.Root name="login">
          <Form.Group.Title
            title="Log In"
            description="Welcome back! Please log in to continue"
          />

          {banner === "LoginComplete" && <Form.Banner.LoginComplete />}
          {banner === "InvalidData" && <Form.Banner.InvalidData />}
          {banner === "InvalidCredentials" && (
            <Form.Banner.InvalidCredentials />
          )}

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
            name="password"
            control={control}
            rules={{ required: { value: true, message: "Required" } }}
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

                  <div className="flex justify-end">
                    <LinkText href="/auth/password/forgot">
                      Forgot Password?
                    </LinkText>
                  </div>
                </Form.Field.Root>
              )
            }}
          />

          {RemoteData.fold(status, {
            onInitial: (): ReactNode => <Form.Button.Login />,
            onPending: (): ReactNode => <Form.Button.Pending />,
            onFailure: (): ReactNode => <Form.Button.TryAgain />,
            onSuccess: (): ReactNode => null,
          })}

          <div className="flex items-center justify-center gap-1">
            <span className="font-sora text-xs text-neutral-400">
              Don't have an account?
            </span>

            <LinkText href="/auth/sign-up">Sign Up</LinkText>
          </div>
        </Form.Group.Root>
      </Form.Root>
    </section>
  )
}
