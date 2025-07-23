import { Badge } from "@/components/badge"
import {
  FormHeader,
  Form,
  FieldInput,
  FormField,
  FieldLabel,
} from "@/components/form"

import { Logo } from "@/components/logo"

export function ForgotPassword() {
  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Forgot Password?"
        description="Enter your email address to recieve a token"
      />

      <Form>
        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput name="email" type="email" placeholder="example@gmail.com">
            <a href="./reset-password" className="cursor-pointer">
              <Badge text={"Send Token"} variant="primary" />
            </a>
          </FieldInput>
        </FormField>
      </Form>
    </section>
  )
}
