import { useState } from "react"
import { Clock12 as IconClock12 } from "lucide-react"

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
import { Link } from "wouter"

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

        <Link href="/forgot">
          <Badge text="Chage Email" variant="secondary" />
        </Link>
      </FormHeader>

      <div />

      <Form>
        <FormField>
          <FieldLabel text="Enter OTP" htmlFor="otp" />
          <FieldInput name="otp" placeholder="Enter code" type="tel">
            <button type="button" className="cursor-pointer">
              <Badge text="Paste" variant="tertiary" />
            </button>
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

        <div className="flex flex-col gap-4">
          <FormSubmit text="Reset Password" />

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between gap-1">
              <span className="font-sora text-xs text-neutral-400">
                Didn't recieve an OTP?
              </span>
              <Link href="/forgot">
                <LinkPrimary text="Resend it" />
              </Link>
            </div>

            <div className="flex items-center justify-between gap-1">
              <IconClock12 className="size-5 text-neutral-400" />
              <span className="font-sora text-primary text-xs font-semibold">
                45s
              </span>
            </div>
          </div>
        </div>
      </Form>
    </section>
  )
}
