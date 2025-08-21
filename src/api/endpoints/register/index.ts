import { BadRequest, Conflict, ImATeapot } from "@/api/errors"

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

  if (Math.random() < 0.1) {
    throw new ImATeapot("Unable to brew coffee")
  }
}

function sleep(duration: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, duration))
}
