import {
  Unauthorized,
  ImATeapot,
  InternalServerError,
  TooManyRequests,
} from "@/api/errors"
import { sleep } from "@/utils/sleep"

import type { Business } from "@/types/business"
import { BUSINESSES } from "@/utils/fake"

export async function externalorganisation(): Promise<readonly Business[]> {
  await sleep(Math.random() * 2000)

  if (Math.random() < 0.1) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < 0.1) {
    throw new ImATeapot("Who do I look like James Hoffman")
  }

  if (Math.random() < 0.1) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < 0.1) {
    throw new TooManyRequests("Try again after 120 seconds")
  }

  return BUSINESSES
}
