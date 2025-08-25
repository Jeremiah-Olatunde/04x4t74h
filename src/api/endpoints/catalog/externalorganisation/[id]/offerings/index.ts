import {
  ImATeapot,
  InternalServerError,
  NotFound,
  TooManyRequests,
  Unauthorized,
} from "@/api/errors"
import type { BusinessWithReviewsAndServices } from "@/types/business"
import { sleep } from "@/utils"
import { BUSINESSES_WITH_REVIEWS_AND_SERVICES } from "@/utils/fake/business"

export async function offerings(
  id: string,
): Promise<BusinessWithReviewsAndServices> {
  await sleep(Math.random() * 500)

  const business = BUSINESSES_WITH_REVIEWS_AND_SERVICES.find(
    (business) => business.id === id,
  )

  if (business === undefined) {
    const name = "object.id"
    const reason = `a resource with id ${id} does not exist`
    const invalidParams = [{ name, reason }]
    throw new NotFound("Requested business does not exist", { invalidParams })
  }

  if (Math.random() < 0.1) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < 0.1) {
    throw new ImATeapot("No Roman, I can't brew coffee")
  }

  if (Math.random() < 0.1) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < 0.1) {
    throw new TooManyRequests("Try again after 120 seconds")
  }

  return business
}
