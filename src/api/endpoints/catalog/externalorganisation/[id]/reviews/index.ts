import {
  BadRequest,
  ImATeapot,
  InternalServerError,
  NotFound,
  TooManyRequests,
  Unauthorized,
} from "@/lib/errors/api"
import { sleep } from "@/utils"
import { id } from "zod/locales"

type ReviewData = {
  reviewBody: string
  reviewRating: number
}

export async function createReview(
  _id: string,
  _reviewData: ReviewData,
): Promise<void> {
  await sleep(Math.random() * 1000)

  if (Math.random() < 0.1) {
    const field = "reviewBody"
    const message = `Invalid ${field}`
    const details = { field, tag: "invalid" } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < 0.1) {
    const field = "reviewRating"
    const message = `Invalid ${field}`
    const details = { field, tag: "invalid" } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < 0.1) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < 0.1) {
    throw new ImATeapot("Teapots don't know anything about reviews")
  }

  if (Math.random() < 0.1) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < 0.1) {
    const time = Math.ceil(Math.random() * 120)
    throw new TooManyRequests(`Try again after ${time} seconds`)
  }

  if (Math.random() < 0.1) {
    const name = "object.id"
    const reason = `a resource with id ${id} does not exist`
    const invalidParams = [{ name, reason }]
    throw new NotFound("Requested business does not exist", { invalidParams })
  }
}
