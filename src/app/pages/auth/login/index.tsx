import {
  CheckCheck as IconCheckCheck,
  LoaderCircle as IconLoaderCircle,
} from "lucide-react"
import { useState } from "react"
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

type Initial = {
  tag: "initial"
}

const INITIAL: Initial = { tag: "initial" }
const PENDING: Pending = { tag: "pending" }

type Pending = {
  tag: "pending"
}

type Failure = {
  tag: "failure"
  reason: "INVALID_DETAILS"
}

type Success = {
  tag: "success"
  payload: { token: string }
}

type SubmitStatus = Initial | Pending | Failure | Success

export function Login() {
  console.log("Component Render")
  const [passwordVisible, setPasswordVisible] = useState(false)

  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(INITIAL)

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

      <Form
        onSubmit={handleSubmit(async (formData) => {
          console.log("submitting")
          setSubmitStatus(PENDING)

          try {
            const payload = await login({ ...formData, password: "" })
            setSubmitStatus({ tag: "success", payload })
          } catch (error) {
            if (error === "INVALID_DETAILS") {
              setSubmitStatus({ tag: "failure", reason: "INVALID_DETAILS" })
            }
          }
        })}
      >
        <FormGroup name="login">
          <FormGroupTitle
            title="Log In"
            description="Welcome back! Please log in to continue"
          />

          {submitStatus.tag === "failure" && <InvalidCredentials />}
          {submitStatus.tag === "success" && <SuccessfulLogin />}

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

          {submitStatus.tag === "pending" ? (
            <ButtonBadge type="button" color="purple" size="lg">
              <IconLoaderCircle className="animate-spin size-5" />
            </ButtonBadge>
          ) : submitStatus.tag === "success" ? (
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

function SuccessfulLogin() {
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

type LoginDetails = Record<"email" | "password", string>

async function login({
  email,
  password,
}: LoginDetails): Promise<{ token: string }> {
  email
  password

  await sleep(2000)

  if (Math.random() < 0.5)
    return { token: "9f67387b-5b24-4952-a5c4-1f73371dbbde" }

  throw "INVALID_DETAILS"
}

function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
