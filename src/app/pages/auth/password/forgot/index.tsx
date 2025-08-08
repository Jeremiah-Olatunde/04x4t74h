import { Badge } from "@/components/badge"
import {
  FormHeader,
  Form,
  FieldInput,
  FormField,
  FieldLabel,
  FormContainer,
} from "@/components/form"

import { Logo } from "@/components/logo"
import { Link } from "wouter"

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
        <FormContainer>
          <FormField>
            <FieldLabel text="email address" htmlFor="email" />
            <FieldInput
              autoComplete="email"
              name="email"
              type="email"
              placeholder="example@gmail.com"
            >
              <Link href="/reset" className="cursor-pointer">
                <Badge color="purple" shade="light" shape="pill" size="sm">
                  Send Token
                </Badge>
              </Link>
            </FieldInput>
          </FormField>
        </FormContainer>
      </Form>
    </section>
  )
}
