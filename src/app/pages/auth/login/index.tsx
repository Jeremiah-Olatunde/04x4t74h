import { useState } from "react"

import {
  Field,
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

type Valid = {
  tag: "valid"
  value: string
}

type Invalid = {
  tag: "invalid"
  value: string
  errors: string[]
}

type Initial = {
  tag: "initial"
  value: string
}

type FormField = Initial | Invalid | Valid

function validateEmail(value: string): FormField {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (regex.test(value)) {
    return { tag: "valid", value }
  }

  return { tag: "invalid", value, errors: ["ERROR_EMAIL_INVALID"] }
}

export function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [email, setEmail] = useState<FormField>({ tag: "initial", value: "" })

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo size="lg" color="purple" />

      <div className="h-8" />

      <Form>
        <FormGroup>
          <FormGroupTitle
            title="Log In"
            description="Welcome back! Please log in to continue"
          />

          <Field name="email">
            <FieldLabel>Email Address</FieldLabel>
            <FieldInput
              autoComplete="email"
              type="email"
              placeholder="Enter your email"
              color={email.tag === "invalid" ? "red" : "neutral"}
              required={true}
              onChange={(event) => {
                const value = event.target.value
                setEmail(validateEmail(value))
              }}
              value={email.value}
            />
          </Field>

          <Field name="password">
            <FieldLabel>Password</FieldLabel>
            <FieldInput
              autoComplete="current-password"
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              color="neutral"
              required={true}
            >
              <FieldPasswordToggle
                visible={passwordVisible}
                onVisibleChange={setPasswordVisible}
              />
            </FieldInput>

            <div className="flex justify-end">
              <LinkText href="/password/forgot">Forgot Password?</LinkText>
            </div>
          </Field>

          <ButtonBadge
            type="submit"
            color="purple"
            size="lg"
            handleClick={() => {}}
          >
            Submit
          </ButtonBadge>

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
