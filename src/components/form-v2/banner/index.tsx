import * as Information from "@/components/card/information"

export function SignUpComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>
        Congratulations! Your account is ready!
      </Information.Title>
      <Information.Content>
        Welcome aboard — your account has been created successfully. Hang tight
        for just a moment while we log you in and get your personalized
        recommendations ready.
      </Information.Content>
    </Information.Root>
  )
}

export function PostSignUpLoginComplete() {
  return (
    <Information.Root color="green">
      <Information.Title>You’re all set!</Information.Title>
      <Information.Content>
        You've been logged in successfully. In just a moment, we’ll take you to
        your homepage so you can start exploring personalized spots to eat,
        chill, date, and discover.
      </Information.Content>
    </Information.Root>
  )
}
export function PostSignUpLoginFailure() {
  return (
    <Information.Root color="red">
      <Information.Title>We couldn’t log you in</Information.Title>
      <Information.Content>
        Something went wrong with your login attempt. You’ll be redirected to
        the login page to try again.
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

export function ReviewCreated() {
  return (
    <Information.Root color="green">
      <Information.Title>Thanks for sharing your experience!</Information.Title>
      <Information.Content>
        Your review was submitted successfully. It’s now part of the community
        and will help others discover great spots to enjoy around the city. We
        appreciate your contribution!
      </Information.Content>
    </Information.Root>
  )
}
