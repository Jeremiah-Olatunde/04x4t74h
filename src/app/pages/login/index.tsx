import {
  FormHeader,
  Form,
  FormField,
  FieldLabel,
  FieldInputPassword,
  FormSubmit,
  FieldInput,
} from "@/components/form"
import { LinkPrimary } from "@/components/link"
import { Logo } from "@/components/logo"

export function Login() {
  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader
        textMain="Log In"
        textSub="Welcome back! Please log in to continue"
      />

      <Form>
        <FormField>
          <FieldLabel text="email address" htmlFor="email" />
          <FieldInput
            name="email"
            type="email"
            placeholder="example@email.com"
          />
        </FormField>

        <FormField>
          <FieldLabel text="password" htmlFor="password" />
          <FieldInputPassword name="password" placeholder="Your password" />
          <div className="flex justify-end">
            <LinkPrimary href="#" text="forgot password?" />
          </div>
        </FormField>

        <FormSubmit text="log in" />

        <div className="flex items-center justify-center gap-1">
          <span className="font-sora text-xs text-neutral-400">
            Don't have an account?
          </span>
          <LinkPrimary href="#" text="sign up" />
        </div>
      </Form>
    </section>
  )
}
