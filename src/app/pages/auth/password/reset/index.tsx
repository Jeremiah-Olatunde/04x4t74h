import { useState } from "react"

import * as Boolean from "@/lib/fp-ts/Boolean.ts"

import { FormHeader, Form, FormField, FormSubmit } from "@/components/form"

import { Logo } from "@/components/logo"
import { LinkPrimary } from "@/components/link"
import {
  FieldInput,
  FieldLabel,
  TogglePasswordVisibility,
} from "@/components/form/field"
import { Badge } from "@/components/badge"

export function ResetPassword() {
  const [email] = useState("jolatunde@luminara.io")
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Reset Password"
        description="A reset token was sent to this email"
      >
        <div className="h-1" />

        <span className="font-sora text-sm font-medium text-neutral-600">
          {email}
        </span>
        <div />

        <a href="./forgot-password">
          <Badge text="Chage Email" variant="secondary" />
        </a>
      </FormHeader>

      <div />

      <Form>
        <FormField>
          <FieldLabel text="Enter OTP" htmlFor="otp" />
          <FieldInput name="otp" placeholder="Enter code" type="tel">
            <Badge text="OTP" variant="tertiary" />
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
        <div className="flex items-center justify-end gap-1">
          <span className="font-sora text-xs text-neutral-400">
            Didn't recieve an OTP?
          </span>
          <LinkPrimary href="#" text="Resend it" />
        </div>

        <FormSubmit text="Reset Password" />
      </Form>
    </section>
  )
}
