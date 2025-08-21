import * as Information from "@/components/card/information"

export function SignUpComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>
        Congratulations! You account has been created
      </Information.Title>
      <Information.Content>
        You’re all set. Discover personalized spots to eat, chill, date, or
        explore—handpicked for you.
      </Information.Content>
    </Information.Root>
  )
}

export function LoginComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>
        Welcome back! Let’s find your next adventure
      </Information.Title>
      <Information.Content>
        You’re all signed in. Discover personalized spots to eat, chill, date,
        or explore—handpicked for you.
      </Information.Content>
    </Information.Root>
  )
}

export function EmailTaken() {
  return (
    <Information.Root color="red">
      <Information.Title>
        Looks like you already have an account
      </Information.Title>
      <Information.Content>
        That email is already registered. Try logging in instead, or use a
        different email to sign up.
      </Information.Content>
    </Information.Root>
  )
}

export function TelephoneTaken() {
  return (
    <Information.Root color="red">
      <Information.Title>
        Looks like you already have an account
      </Information.Title>
      <Information.Content>
        That phone number is already registered. Try logging in instead, or use
        a different email to sign up.
      </Information.Content>
    </Information.Root>
  )
}

export function InvalidData() {
  return (
    <Information.Root color="red">
      <Information.Title>That doesn’t look quite right</Information.Title>
      <Information.Content>
        One of the fields you entered has an invalid format. Please double-check
        and try again.
      </Information.Content>
    </Information.Root>
  )
}

export function InvalidCredentials() {
  return (
    <Information.Root color="red">
      <Information.Title>
        We couldn't find an account with those details
      </Information.Title>
      <Information.Content>
        Make sure you have entered the right email and password, or sign up if
        you are new
      </Information.Content>
    </Information.Root>
  )
}
