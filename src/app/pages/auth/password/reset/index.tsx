import { useState } from "react"
import { Clock12 as IconClock12 } from "lucide-react"

import * as Boolean from "Boolean"

import { FormHeader, Form, FormField, FormContainer } from "@/components/form"

import { Logo } from "@/components/logo"
import { LinkPrimary } from "@/components/link"
import {
  FieldErrors,
  FieldInput,
  FieldLabel,
  FieldStatus,
  TogglePasswordVisibility,
} from "@/components/form/field"
import { Badge } from "@/components/badge"
import { Link, useLocation } from "wouter"
import { Button } from "@/components/button"
import { Icon } from "@/components/icon"

export function ResetPassword() {
  const [, setLocation] = useLocation()
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
        <FormContainer>
          <FormField>
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="Enter OTP" htmlFor="otp" />
              <FieldStatus status="warning" />
            </div>
            <FieldInput
              variant="warning"
              name="otp"
              placeholder="Enter code"
              type="tel"
            >
              <button type="button" className="cursor-pointer">
                <Badge text="Paste" variant="neutral" />
              </button>
            </FieldInput>
          </FormField>

          <FormField>
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="password" htmlFor="password" />
              <FieldStatus status="failure" />
            </div>

            <FieldInput
              variant="failure"
              name="password"
              placeholder="Enter your password"
              type={passwordVisible ? "text" : "password"}
            >
              <TogglePasswordVisibility
                visible={passwordVisible}
                handleClick={() => setPasswordVisible(Boolean.invert)}
              />
            </FieldInput>
            <FieldErrors
              errors={[
                "must have more than 5 characters",
                "must have a symbol",
                "must have a letter",
              ]}
            />
          </FormField>

          <FormField>
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="confirm password" htmlFor="confirm-password" />
              <FieldStatus status="success" />
            </div>

            <FieldInput
              name="confirm-password"
              placeholder="Re-enter your password"
              variant="success"
              type={passwordVisible ? "text" : "password"}
            >
              <TogglePasswordVisibility
                visible={passwordVisible}
                handleClick={() => setPasswordVisible(Boolean.invert)}
              />
            </FieldInput>
          </FormField>

          <div className="flex flex-col gap-4">
            <Button
              tag="button"
              type="submit"
              text="Reset Password"
              variant="primary"
              handleClick={() => setLocation("~/auth/login")}
            />

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
                <Icon icon={IconClock12} label="otp resend countdown" />
                <span className="font-sora text-xs font-semibold text-primary">
                  45s
                </span>
              </div>
            </div>
          </div>
        </FormContainer>
      </Form>
    </section>
  )
}
