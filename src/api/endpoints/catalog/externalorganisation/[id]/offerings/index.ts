import { NotFound } from "@/api/errors"

import type { BusinessWithReviewsAndServices } from "@/types/business"

export async function offerings(
  id: string,
): Promise<BusinessWithReviewsAndServices> {
  const headers = { "Content-Type": "application/json" }
  const response = await fetch("/data/externalorganisation.json", { headers })

  if (!response.ok) throw response

  // if (Math.random() < 0.1) {
  //   throw new Unauthorized("Invalid credentials")
  // }
  //
  // if (Math.random() < 0.1) {
  //   throw new ImATeapot("No Roman, I can't brew coffee")
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

  const businesses: readonly BusinessWithReviewsAndServices[] =
    await response.json()

  const business = businesses.find((business) => business.id === id)

  if (business === undefined) {
    const name = "object.id"
    const reason = `a resource with id ${id} does not exist`
    const invalidParams = [{ name, reason }]
    throw new NotFound("Requested business does not exist", { invalidParams })
  }

  return business
}
