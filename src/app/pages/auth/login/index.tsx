import {
  CheckCheck as IconCheckCheck,
  LoaderCircle as IconLoaderCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useErrorBoundary } from "react-error-boundary"
import { useLocation } from "wouter"

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

import {
  LoginComplete,
  InvalidData,
  InvalidCredentials,
} from "@/components/form-v2/banner"

import { Logo } from "@/components/logo"
import { ButtonBadge } from "@/components/button"
import { LinkText } from "@/components/link"
import { login } from "@/api/endpoints/login"
import { BadRequest, Unauthorized } from "@/api/errors"

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

  type RemoteData = "Initial" | "Pending" | "Failure" | "Success"
  const [status, setStatus] = useState<RemoteData>("Initial")

  type Banner = "LoginComplete" | "InvalidData" | "InvalidCredentials"
  const [banner, setBanner] = useState<null | Banner>(null)

  const { control, handleSubmit, setError } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  useEffect(() => {
    if (status !== "Success") {
      return
    }

    setLocation("~/home")
  }, [status])

  async function onSubmit(formValues: FormValues) {
    setBanner(null)
    setStatus("Pending")

    try {
      await login(formValues)
      setStatus("Success")
      setBanner("LoginComplete")
    } catch (error) {
      setStatus("Failure")
      if (error instanceof BadRequest) {
        const field = error.details.field

        const isEmail = field === "email"

        if (!isEmail) {
          throw error
        }

        const options = { shouldFocus: true }
        const fieldError = { types: { conflict: error.message } }
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
      <Logo size="lg" color="purple" />

      <div className="h-8" />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup name="login">
          <FormGroupTitle
            title="Log In"
            description="Welcome back! Please log in to continue"
          />

          {banner === "LoginComplete" && <LoginComplete />}
          {banner === "InvalidData" && <InvalidData />}
          {banner === "InvalidCredentials" && <InvalidCredentials />}

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
            name="password"
            control={control}
            rules={{ required: { value: true, message: "Required" } }}
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

                  <div className="flex justify-end">
                    <LinkText href="/password/forgot">
                      Forgot Password?
                    </LinkText>
                  </div>
                </Field>
              )
            }}
          />

          {status === "Pending" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconLoaderCircle className="animate-spin size-5" />
            </ButtonBadge>
          ) : status === "Success" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconCheckCheck className="size-5" />
            </ButtonBadge>
          ) : (
            <ButtonBadge type="submit" color="purple" size="lg">
              Submit
            </ButtonBadge>
          )}

          <div className="flex items-center justify-center gap-1">
            <span className="font-sora text-xs text-neutral-400">
              Don't have an account?
            </span>

            <LinkText href="/sign-up">Sign Up</LinkText>
          </div>
        </FormGroup>
      </Form>
    </section>
  )
}
