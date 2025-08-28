import {
  FormHeader,
  Form,
  FieldInput,
  FormField,
  FieldLabel,
  FormContainer,
} from "@/components/form"

import { Logo } from "@/components/logo"
import { Pill } from "@/components/pill"
import { Link } from "wouter"

export function PasswordForgot() {
  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo size="lg" color="purple" />

      <div className="h-8" />

      <FormHeader
        title="Forgot Password?"
        description="Enter your email address to recieve a token"
      />

      <Form>
        <FormContainer>
          <FormField>
            <FieldLabel text="email address" htmlFor="email" />
            <FieldInput
              autoComplete="email"
              color="neutral"
              name="email"
              type="email"
              placeholder="example@gmail.com"
            >
              <Link href="/auth/password/reset" className="cursor-pointer">
                <Pill color="purple" size="sm">
                  Send Token
                </Pill>
              </Link>
            </FieldInput>
          </FormField>
        </FormContainer>
      </Form>
    </section>
  )
}
