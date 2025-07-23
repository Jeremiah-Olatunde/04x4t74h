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
        textMain="Request Token"
        textSub="Enter your email address to recieve a token"
      />

      <Form>
        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput name="email" type="email" placeholder="example@gmail.com">
            <button
              type="submit"
              className="bg-primary/10 flex cursor-pointer items-center justify-center rounded-s-full rounded-e-full px-3 py-1"
            >
              <span className="text-xxs text-primary font-sora font-medium">
                Send Token
              </span>
            </button>
          </FieldInput>
        </FormField>
      </Form>
    </section>
  )
}
