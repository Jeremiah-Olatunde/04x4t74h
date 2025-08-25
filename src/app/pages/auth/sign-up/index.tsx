import { useLocation } from "wouter"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useErrorBoundary } from "react-error-boundary"
import {
  CheckCheck as IconCheckCheck,
  LoaderCircle as IconLoaderCircle,
} from "lucide-react"

import { FlagNg } from "@/assets/icons/flag-ng"
import { ButtonBadge } from "@/components/button"
import {
  Field,
  FieldErrors,
  FieldInput,
  FieldLabel,
  FieldPasswordToggle,
  Form,
  FormGroup,
  FormGroupTitle,
} from "@/components/form-v2"

import { Logo } from "@/components/logo"
import { LinkText } from "@/components/link"

import {
  EmailTaken,
  InvalidData,
  SignUpComplete,
  PostSignUpLoginComplete,
  PostSignUpLoginFailure,
  TelephoneTaken,
} from "@/components/form-v2/banner"

import { ApiError, AutoLoginError, BadRequest, Conflict } from "@/api/errors"
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

export function SignUp() {
  const [_, setLocation] = useLocation()
  const { showBoundary } = useErrorBoundary()
  const [passwordVisible, setPasswordVisible] = useState(false)

  type RemoteData = "Initial" | "Pending" | "Failure" | "Success"
  const [statusSignUp, setStatusSignUp] = useState<RemoteData>("Initial")
  const [statusLogin, setStatusLogin] = useState<RemoteData>("Initial")

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
    if (statusLogin === "Success") {
      setTimeout(setLocation, 1000, "~/home")
    }
  }, [statusLogin])

  async function onSubmit(formValues: FormValues) {
    setStatusSignUp("Pending")

    try {
      await register(formValues)
      setStatusSignUp("Success")
      setBanner("SignUpComplete")

      try {
        setStatusLogin("Pending")
        await login(formValues)
        setStatusLogin("Success")
        setBanner("PostSignUpLoginComplete")
      } catch (error) {
        if (error instanceof ApiError) {
          throw new AutoLoginError(error.code, error.text, error.message)
        }

        throw error
      }
    } catch (error) {
      setStatusSignUp("Failure")

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
      <Logo color="purple" size="lg" />

      <div className="h-8" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup name="group-one">
          <FormGroupTitle title="Sign In" description="Create an account!" />

          {banner === "EmailTaken" && <EmailTaken />}
          {banner === "TelephoneTaken" && <TelephoneTaken />}
          {banner === "SignUpComplete" && <SignUpComplete />}
          {banner === "PostSignUpLoginComplete" && <PostSignUpLoginComplete />}
          {banner === "PostSignUpLoginFailure" && <PostSignUpLoginFailure />}
          {banner === "InvalidData" && <InvalidData />}

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
                <Field>
                  <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                  <FieldInput
                    {...field}
                    id={field.name}
                    autoComplete="name"
                    color={fieldState.invalid ? "red" : "neutral"}
                    placeholder="Enter your full name"
                    type="text"
                  />
                  <FieldErrors errors={errors} />
                </Field>
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
                <Field>
                  <FieldLabel htmlFor={field.name}>Email Address</FieldLabel>
                  <FieldInput
                    {...field}
                    id={field.name}
                    autoComplete="email"
                    color={fieldState.invalid ? "red" : "neutral"}
                    placeholder="Enter your email"
                    type="email"
                  />
                  <FieldErrors errors={errors} />
                </Field>
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
                <Field>
                  <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                  <FieldInput
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
                  </FieldInput>
                  <FieldErrors errors={errors} />
                </Field>
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
                <Field>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <FieldInput
                    {...field}
                    id={field.name}
                    autoComplete="current-password"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Enter your password"
                    color={fieldState.invalid ? "red" : "neutral"}
                  >
                    <FieldPasswordToggle
                      visible={passwordVisible}
                      onVisibleChange={setPasswordVisible}
                    />
                  </FieldInput>

                  <FieldErrors errors={errors} />
                </Field>
              )
            }}
          />

          {statusSignUp === "Pending" || statusLogin === "Pending" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconLoaderCircle className="animate-spin size-5" />
            </ButtonBadge>
          ) : statusSignUp === "Success" || statusLogin === "Success" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconCheckCheck className="size-5" />
            </ButtonBadge>
          ) : (
            <ButtonBadge type="submit" color="purple" size="lg">
              Sign Up
            </ButtonBadge>
          )}

          <div className="flex items-center justify-center gap-1">
            <span className="font-sora text-xs text-neutral-400">
              Already have an account?
            </span>

            <LinkText href="/login">Login</LinkText>
          </div>
        </FormGroup>
      </Form>
    </section>
  )
}
