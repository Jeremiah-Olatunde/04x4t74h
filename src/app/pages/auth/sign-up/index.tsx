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

export function SignUp() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader title="Sign Up" description="Create your account" />

      <Form>
        <FormField>
          <FieldLabel text="full name" htmlFor="email" />
          <FieldInput name="name" type="text" placeholder="Bola Ahmed Tinubu" />
        </FormField>

        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput
            name="email"
            type="email"
            placeholder="example@email.com"
          />
        </FormField>

        <FormField>
          <FieldLabel text="phone number" htmlFor="telephone" />
          <FieldInput name="telephone" type="tel" placeholder="08178917635">
            <div className="relative">
              <button
                type="button"
                className="absolute right-0 -translate-y-1/2 cursor-pointer rounded-sm bg-neutral-200 px-1.5 py-0.5"
              >
                <svg
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                  id="flag-icons-ng"
                  viewBox="0 0 640 480"
                >
                  <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path
                      fill="#008753"
                      d="M426.6 0H640v480H426.6zM0 0h213.3v480H0z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </FieldInput>
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
          <Link href="/login">
            <LinkPrimary text="Login" />
          </Link>
        </div>
      </Form>
    </section>
  )
}
