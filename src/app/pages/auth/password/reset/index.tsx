import { useState } from "react"
import { Clock12 as IconClock12 } from "lucide-react"
import { useLocation } from "wouter"

import * as Boolean from "Boolean"

import { Icon } from "@/components/icon"
import { Logo } from "@/components/logo"

import {
  FieldInput,
  FieldLabel,
  TogglePasswordVisibility,
} from "@/components/form/field"
import { FormHeader, Form, FormField, FormContainer } from "@/components/form"
import { LinkBadge, LinkText } from "@/components/link"
import { ButtonBadge } from "@/components/button"

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

        <LinkBadge
          color="yellow"
          href="/forgot"
          shade="dark"
          shape="pill"
          size="sm"
        >
          Change Email
        </LinkBadge>
      </FormHeader>

      <div />

      <Form>
        <FormContainer>
          <FormField>
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="Enter OTP" htmlFor="otp" />
            </div>
            <FieldInput
              autoComplete="one-time-code"
              variant="neutral"
              name="otp"
              placeholder="Enter code"
              type="tel"
            >
              <ButtonBadge
                color="neutral"
                shade="light"
                shape="pill"
                size="sm"
                type="button"
                handleClick={() => {}}
              >
                Paste
              </ButtonBadge>
            </FieldInput>
          </FormField>

          <FormField>
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="password" htmlFor="password" />
            </div>

            <FieldInput
              autoComplete="new-password"
              variant="neutral"
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
            <div className="flex items-center justify-start gap-2">
              <FieldLabel text="confirm password" htmlFor="confirm-password" />
            </div>

            <FieldInput
              autoComplete="new-password"
              name="confirm-password"
              placeholder="Re-enter your password"
              variant="neutral"
              type={passwordVisible ? "text" : "password"}
            >
              <TogglePasswordVisibility
                visible={passwordVisible}
                handleClick={() => setPasswordVisible(Boolean.invert)}
              />
            </FieldInput>
          </FormField>

          <div className="flex flex-col gap-4">
            <ButtonBadge
              color="purple"
              shape="rounded"
              shade="dark"
              size="lg"
              type="submit"
              handleClick={() => setLocation("~/auth/login")}
            >
              Reset Password
            </ButtonBadge>

            <div className="flex items-center justify-between">
              <div className="flex items-center justify-between gap-1">
                <span className="font-sora text-xs text-neutral-400">
                  Didn't recieve an OTP?
                </span>

                <LinkText href="/forgot">Resend it</LinkText>
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
