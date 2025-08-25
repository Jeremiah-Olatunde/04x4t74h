import {
  BadRequest,
  Conflict,
  ImATeapot,
  InternalServerError,
  TooManyRequests,
} from "@/api/errors"

type RegisterKeys = "name" | "email" | "password" | "telephone"
type RegisterDetails = Record<RegisterKeys, string>

export async function register({}: RegisterDetails): Promise<void> {
  await sleep(Math.random() * 1500)

  if (Math.random() < 0.3) {
    throw new Conflict("Email Taken", { field: "email" })
  }

  if (Math.random() < 0.3) {
    const fields = ["email", "telephone", "password"]
    const field = fields[Math.floor(Math.random() * 3)]
    console.log("random field", field)
    const message = `Invalid ${field}`
    const details = { field, tag: "invalid" } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < 0.2) {
    throw new ImATeapot("You did not just ask me to make a smoothie")
  }

  if (Math.random() < 0.2) {
    throw new InternalServerError("Unrecoverable server error")
  }

  if (Math.random() < 0.2) {
    throw new TooManyRequests("Try again after 120 seconds")
  }
}

function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
