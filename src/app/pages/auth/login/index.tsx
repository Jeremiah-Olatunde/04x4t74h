import {
  CheckCheck as IconCheckCheck,
  LoaderCircle as IconLoaderCircle,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Controller, useForm } from "react-hook-form"

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
import { ButtonBadge } from "@/components/button"
import { LinkText } from "@/components/link"
import * as Information from "@/components/card/information"

type FormValues = {
  email: string
  password: string
}

const defaultValues = {
  email: "",
  password: "",
}

export function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [details, setDetails] = useState<null | LoginDetails>(null)
  const loginData = useLogin(details)

  const { control, handleSubmit } = useForm<FormValues>({
    criteriaMode: "all",
    defaultValues,
    mode: "onChange",
    shouldUseNativeValidation: true,
  })

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo size="lg" color="purple" />

      <div className="h-8" />

      <Form onSubmit={handleSubmit(setDetails)}>
        <FormGroup name="login">
          <FormGroupTitle
            title="Log In"
            description="Welcome back! Please log in to continue"
          />

          {loginData.tag === "success" && <LoginComplete />}

          {loginData.tag === "failure" && loginData.error.status === 400 && (
            <InvalidData />
          )}

          {loginData.tag === "failure" && loginData.error.status === 401 && (
            <InvalidCredentials />
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

          {loginData.tag === "pending" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconLoaderCircle className="animate-spin size-5" />
            </ButtonBadge>
          ) : loginData.tag === "success" ? (
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

function InvalidCredentials() {
  return (
    <Information.Root color="red">
      <Information.Title>
        We couldn't find an account with those details
      </Information.Title>
      <Information.Content>
        Make sure you have entered the right email and password, or sign up if
        you are new
      </Information.Content>
    </Information.Root>
  )
}

function LoginComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>
        Welcome back! Let’s find your next adventure
      </Information.Title>
      <Information.Content>
        You’re all signed in. Discover personalized spots to eat, chill, date,
        or explore—handpicked for you.
      </Information.Content>
    </Information.Root>
  )
}

function InvalidData() {
  return (
    <Information.Root color="green">
      <Information.Title>That doesn’t look quite right</Information.Title>
      <Information.Content>
        One of the fields you entered has an invalid format. Please double-check
        and try again.
      </Information.Content>
    </Information.Root>
  )
}

type LoginDetails = Record<"email" | "password", string>

type Initial = { tag: "initial" }
type Pending = { tag: "pending" }
type Failure = { tag: "failure"; error: ApiError<400 | 401> }
type Success<T> = { tag: "success"; result: T }

type RemoteData<T> = Initial | Pending | Failure | Success<T>

const initial: Initial = { tag: "initial" }

type LoginPayload = { token: string }

function useLogin(details: null | LoginDetails): RemoteData<LoginPayload> {
  const [data, setData] = useState<RemoteData<LoginPayload>>(initial)

  useEffect(() => {
    if (details === null) {
      return
    }

    setData({ tag: "pending" })

    login(details)
      .then((result) => {
        setData({ tag: "success", result })
      })
      .catch((error) => {
        if (error instanceof ApiError) {
          if (error.is(400) || error.is(401)) {
            setData({ tag: "failure", error })
          }
        }

        throw error
      })

    return () => console.log("ABORTING REQUEST: LOGIN")
  }, [JSON.stringify(details)])

  return data
}

async function login({}: LoginDetails): Promise<LoginPayload> {
  if (Math.random() < 0.3) {
    throw new ApiError(400, "Invalid Email")
  }

  if (Math.random() < 0.3) {
    throw new ApiError(401, "Invalid Credentiails")
  }

  return { token: "f76ef3ee-ec8c-472e-9388-bc2f1f81196e" }
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
