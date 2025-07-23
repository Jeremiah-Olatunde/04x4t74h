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

import { Logo } from "@/components/logo"

export function ResetPassword() {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Reset Password"
        description="Set a new password for your account"
      />

      <Form>
        <FormField>
          <FieldLabel text="password" htmlFor="password" />
          <FieldInput
            name="password"
            placeholder="Enter your password"
            type={passwordVisible ? "text" : "password"}
          >
            <div className="absolute top-0 right-0 p-4">
              <TogglePasswordVisibility
                visible={passwordVisible}
                handleClick={() => setPasswordVisible(Boolean.invert)}
              />
            </div>
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

        <FormSubmit text="reset password" />
      </Form>
    </section>
  )
}
