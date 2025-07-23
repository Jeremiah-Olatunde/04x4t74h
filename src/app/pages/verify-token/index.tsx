import { useState } from "react"

import { FormHeader, Form, FormField, FormSubmit } from "@/components/form"

import { Logo } from "@/components/logo"
import { LinkPrimary } from "@/components/link"
import { FieldInput } from "@/components/form/field"
import { Badge } from "@/components/badge"

export function VerifyToken() {
  const [email] = useState("jolatunde@luminara.io")

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Verify Token"
        description="Enter the code sent to this your email"
      >
        <div className="text-primary font-sora text-xs font-semibold">
          {email}
        </div>
      </FormHeader>

      <div />

      <Form>
        <FormField>
          <FieldInput name="otp" placeholder="Enter code" type="tel">
            <Badge text="OTP" variant="tertiary" />
          </FieldInput>
        </FormField>

        <div className="flex items-center justify-center gap-1">
          <span className="font-sora text-xs text-neutral-400">
            Didn't recieve an OTP?
          </span>
          <LinkPrimary href="#" text="Resend it" />
        </div>

        <FormSubmit text="Verify" />
      </Form>
    </section>
  )
}
