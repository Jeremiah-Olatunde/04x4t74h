import { useState } from "react"
import { Tabs } from "radix-ui"

import * as Boolean from "Boolean"

import {
  FormHeader,
  Form,
  FormField,
  FieldLabel,
  FieldInput,
  TogglePasswordVisibility,
  FormContainer,
} from "@/components/form"
import { Logo } from "@/components/logo"
import { LinkText } from "@/components/link"
import { ButtonBadge } from "@/components/button"
import { FlagNg } from "@/assets/icons/flag-ng"

export function SignUp() {
  const [stage, setStage] = useState("details-personal")
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <section className="flex flex-col gap-4 px-6 py-8">
      <Logo />

      <div className="h-8" />

      <FormHeader title="Sign Up" description="Create your account" />

      <Form>
        <Tabs.Root value={stage} onValueChange={setStage}>
          <div className="flex flex-col gap-8">
            <Tabs.List aria-label="create an account">
              <div className="grid grid-cols-2 gap-2">
                <Tabs.Trigger value="details-personal">
                  <ButtonStage
                    active={stage === "details-personal"}
                    stage={1}
                    text="Personal Details"
                  />
                </Tabs.Trigger>

                <Tabs.Trigger value="details-account">
                  <ButtonStage
                    active={stage === "details-account"}
                    stage={2}
                    text="Account Details"
                  />
                </Tabs.Trigger>
              </div>
            </Tabs.List>

            <Tabs.Content value="details-personal">
              <FormContainer>
                <FormField>
                  <FieldLabel text="full name" htmlFor="email" />
                  <FieldInput
                    name="name"
                    type="text"
                    placeholder="Bola Ahmed Tinubu"
                  />
                </FormField>

                <FormField>
                  <FieldLabel text="phone number" htmlFor="telephone" />
                  <FieldInput
                    name="telephone"
                    type="tel"
                    placeholder="08178917635"
                  >
                    <div className="relative">
                      <button
                        type="button"
                        className="absolute right-0 -translate-y-1/2 cursor-pointer rounded-sm bg-neutral-200 px-1.5 py-0.5"
                      >
                        <FlagNg className="size-6" />
                      </button>
                    </div>
                  </FieldInput>
                </FormField>

                <ButtonBadge
                  color="purple"
                  shade="dark"
                  shape="rounded"
                  size="lg"
                  type="button"
                  handleClick={() => setStage("details-account")}
                >
                  Next
                </ButtonBadge>

                <div className="flex items-center justify-center gap-1">
                  <span className="font-sora text-xs text-neutral-400">
                    Already have an account?
                  </span>

                  <LinkText href="/login"> Login </LinkText>
                </div>
              </FormContainer>
            </Tabs.Content>

            <Tabs.Content value="details-account">
              <FormContainer>
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
                  <FieldInput
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
                  <FieldLabel
                    text="confirm password"
                    htmlFor="confirm-password"
                  />
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

                <div className="flex gap-2">
                  <ButtonBadge
                    type="button"
                    color="neutral"
                    size="lg"
                    shade="light"
                    shape="rounded"
                    handleClick={() => setStage("details-personal")}
                  >
                    Back
                  </ButtonBadge>

                  <ButtonBadge
                    type="submit"
                    color="purple"
                    size="lg"
                    shade="dark"
                    shape="rounded"
                    handleClick={() => {}}
                  >
                    Submit
                  </ButtonBadge>
                </div>

                <div className="flex items-center justify-center gap-1">
                  <span className="font-sora text-xs text-neutral-400">
                    Already have an account?
                  </span>

                  <LinkText href="/login">Login</LinkText>
                </div>
              </FormContainer>
            </Tabs.Content>
          </div>
        </Tabs.Root>
      </Form>
    </section>
  )
}

function ButtonStage({
  active,
  text,
  stage,
}: {
  active: boolean
  text: string
  stage: number
}) {
  return (
    // Not a button element as radix Tabs.Trigger component is already a button element
    <div
      className={`flex w-full cursor-pointer items-center justify-center gap-2 border-b-2 ${active ? "border-primary" : "border-neutral-200"} p-2`}
    >
      <div
        className={`flex aspect-square w-4 items-center justify-center rounded-full ${active ? "bg-primary" : "bg-neutral-200"}`}
      >
        <span
          className={`font-sora text-[8px] ${active ? "text-white" : "text-neutral-400"}`}
        >
          {stage}
        </span>
      </div>
      <span
        className={`font-sora text-xs font-medium ${active ? "text-primary" : "text-neutral-400"} capitalize`}
      >
        {text}
      </span>
    </div>
  )
}
