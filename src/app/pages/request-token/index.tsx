import { BadgePrimary } from "@/components/badge"
import {
  FormHeader,
  Form,
  FieldInput,
  FormField,
  FieldLabel,
} from "@/components/form"

import { Logo } from "@/components/logo"

export function RequestToken() {
  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        title="Request Token"
        description="Enter your email address to recieve a token"
      />

      <Form>
        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput name="email" type="email" placeholder="example@gmail.com">
            <button type="submit" className="cursor-pointer">
              <BadgePrimary />
            </button>
          </FieldInput>
        </FormField>
      </Form>
    </section>
  )
}
