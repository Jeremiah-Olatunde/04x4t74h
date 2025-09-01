import * as Placeholder from "@/components/placeholder"

export function PasswordForgot() {
  return (
    <Placeholder.Root>
      <Placeholder.Header>
        <Placeholder.Title>Forgot Password</Placeholder.Title>
        <Placeholder.Subtitle>Recover your account.</Placeholder.Subtitle>
      </Placeholder.Header>

      <Placeholder.Content>
        Enter your email address, and we’ll send you a secure link to reset your
        password. This feature is still in progress—check back soon.
      </Placeholder.Content>

      <div className="flex justify-start gap-1">
        <Placeholder.Back />
        <Placeholder.Home />
      </div>
    </Placeholder.Root>
  )
}

// export function PasswordForgot() {
//   return (
//     <section className="flex flex-col gap-4 px-6 py-8">
//       <Logo size="lg" color="purple" />
//
//       <div className="h-8" />
//
//       <FormHeader
//         title="Forgot Password?"
//         description="Enter your email address to recieve a token"
//       />
//
//       <Form>
//         <FormContainer>
//           <FormField>
//             <FieldLabel text="email address" htmlFor="email" />
//             <FieldInput
//               autoComplete="email"
//               color="neutral"
//               name="email"
//               type="email"
//               placeholder="example@gmail.com"
//             >
//               <Link href="/auth/password/reset" className="cursor-pointer">
//                 <Pill color="purple" size="sm">
//                   Send Token
//                 </Pill>
//               </Link>
//             </FieldInput>
//           </FormField>
//         </FormContainer>
//       </Form>
//     </section>
//   )
// }
