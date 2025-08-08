import { useState } from "react"

import * as Boolean from "Boolean"

import {
  FormHeader,
  Form,
  FormField,
  FieldLabel,
  FieldInput,
  TogglePasswordVisibility,
  FormContainer,
} from "@/components/form"
import { Logo } from "@/components/logo"
import { LinkText } from "@/components/link"
import { ButtonBadge } from "@/components/button"

export function Login() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Log In"
        description="Welcome back! Please log in to continue"
      />

      <Form>
        <FormContainer>
          <FormField>
            <FieldLabel text="email address" htmlFor="email" />
            <FieldInput
              autoComplete="email"
              color="neutral"
              name="email"
              type="email"
              placeholder="example@email.com"
            />
          </FormField>

          <FormField>
            <FieldLabel text="password" htmlFor="password" />
            <FieldInput
              autoComplete="current-password"
              color="neutral"
              name="password"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
            >
              <TogglePasswordVisibility
                visible={passwordVisible}
                handleClick={() => setPasswordVisible(Boolean.invert)}
              />
            </FieldInput>

            <div className="flex justify-end">
              <LinkText href="/password/forgot">Forgot Password?</LinkText>
            </div>
          </FormField>

          <ButtonBadge
            color="purple"
            shape="rounded"
            shade="dark"
            size="lg"
            type="submit"
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
        </FormContainer>
      </Form>
    </section>
  )
}
