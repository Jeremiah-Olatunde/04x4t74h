import type { Business } from "@/types/business"

export async function externalorganisation(): Promise<readonly Business[]> {
  const headers = { "Content-Type": "application/json" }
  const response = await fetch("/data/externalorganisation.json", {
    headers,
  })

  if (!response.ok) throw response

  // if (Math.random() < 0.1) {
  //   throw new Unauthorized("Invalid credentials")
  // }
  //
  // if (Math.random() < 0.1) {
  //   throw new ImATeapot("Who do I look like James Hoffman")
  // }
  //
  // if (Math.random() < 0.1) {
  //   throw new InternalServerError(
  //     "An unexpected error occurred while processing your request",
  //   )
  // }
  //
  // if (Math.random() < 0.1) {
  //   throw new TooManyRequests("Try again after 120 seconds")
  // }

  const businesses: readonly Business[] = await response.json()
  return businesses
}
