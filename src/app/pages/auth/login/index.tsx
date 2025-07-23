import { useState } from "react"

import * as Boolean from "@/lib/fp-ts/Boolean.ts"

import {
  FormHeader,
  Form,
  FormField,
  FieldLabel,
  FormSubmit,
  FieldInput,
  TogglePasswordVisibility,
} from "@/components/form"
import { LinkPrimary } from "@/components/link"
import { Logo } from "@/components/logo"
import { Link } from "wouter"

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
        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput
            name="email"
            type="email"
            placeholder="example@email.com"
          />
        </FormField>

        <FormField>
          <FieldLabel text="password" htmlFor="password" />
          <FieldInput
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
            <Link href="/password/forgot">
              <LinkPrimary text="Forgot Password?" />
            </Link>
          </div>
        </FormField>

        <FormSubmit text="log in" />

        <div className="flex items-center justify-center gap-1">
          <span className="font-sora text-xs text-neutral-400">
            Don't have an account?
          </span>
          <Link href="/sign-up">
            <LinkPrimary text="Sign Up" />
          </Link>
        </div>
      </Form>
    </section>
  )
}
