import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
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

import * as Information from "@/components/card/information"
import { Logo } from "@/components/logo"
import { LinkText } from "@/components/link"

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
  const [passwordVisible, setPasswordVisible] = useState(false)

  type RemoteData = "Initial" | "Pending" | "Failure" | "Success"
  const [status, setStatus] = useState<RemoteData>("Initial")

  type Banner = "EmailTaken" | "SignUpComplete"
  const [banner, setBanner] = useState<null | Banner>(null)

  const { control, handleSubmit, setError } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo color="purple" size="lg" />

      <div className="h-8" />

      <Form
        onSubmit={handleSubmit(async function (formValues) {
          setStatus("Pending")

          try {
            await register(formValues)
            setStatus("Success")
            setBanner("SignUpComplete")
          } catch (error) {
            if (error instanceof ApiError) {
              if (error.is(409)) {
                const field = "email"
                const options = { shouldFocus: true }
                const fieldError = { types: { taken: "Email taken" } }
                setError(field, fieldError, options)
                setBanner("EmailTaken")
              }

              if (error.is(400)) {
              }
            }

            setStatus("Failure")
            throw error
          }
        })}
      >
        <FormGroup name="group-one">
          <FormGroupTitle title="Sign In" description="Create an account!" />

          {banner === "EmailTaken" && <EmailTaken />}
          {banner === "SignUpComplete" && <SignUpComplete />}

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

function SignUpComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>
        Congratulations! You account has been created
      </Information.Title>
      <Information.Content>
        You’re all set. Discover personalized spots to eat, chill, date, or
        explore—handpicked for you.
      </Information.Content>
    </Information.Root>
  )
}

function EmailTaken() {
  return (
    <Information.Root color="red">
      <Information.Title>
        Looks like you already have an account
      </Information.Title>
      <Information.Content>
        That email is already registered. Try logging in instead, or use a
        different email to sign up.
      </Information.Content>
    </Information.Root>
  )
}

const StatusToText = {
  400: "Bad Request",
  401: "Unauthorized",
  409: "Conflict",
  418: "I'm a teapot",
} as const

type Status = keyof typeof StatusToText

class ApiError<T extends Status> extends Error {
  status: T
  statusText: (typeof StatusToText)[T]
  constructor(status: T, message: string) {
    super(message)
    this.status = status
    this.statusText = StatusToText[status]
  }

  is<T extends Status>(this: ApiError<any>, status: T): this is ApiError<T> {
    return this.status === status
  }

  static is<T extends Status>(status: T, error: unknown): error is ApiError<T> {
    return error instanceof ApiError && error.status === status
  }
}

type RegisterDetails = Record<
  "name" | "email" | "password" | "telephone",
  string
>
async function register({}: RegisterDetails): Promise<{ token: string }> {
  if (Math.random() < 0.5) {
    throw new ApiError(409, "Email Taken")
  }

  return { token: "7fc979df-0284-436b-affb-10bf465423a5" }
}
