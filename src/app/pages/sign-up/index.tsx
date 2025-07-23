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

export function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader textMain="Sign Up" textSub="Create your account" />

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
          <FieldLabel text="full name" htmlFor="email" />
          <FieldInput name="name" type="text" placeholder="Bola Ahmed Tinubu" />
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
        </FormField>

        <FormField>
          <FieldLabel text="confirm password" htmlFor="confirm-password" />
          <FieldInput
            name="confirm-password"
            placeholder="Re-enter your password"
            type={passwordVisible ? "text" : "password"}
          >
            <TogglePasswordVisibility
              visible={passwordVisible}
              handleClick={() => setPasswordVisible(Boolean.invert)}
            />
          </FieldInput>
        </FormField>

        <FormSubmit text="sign up" />

        <div className="flex items-center justify-center gap-1">
          <span className="font-sora text-xs text-neutral-400">
            Already have an account?
          </span>
          <LinkPrimary href="./login" text="log in" />
        </div>
      </Form>
    </section>
  )
}
