import { BadRequest, ImATeapot, Unauthorized } from "@/api/errors"
import { sleep } from "@/utils"

type LoginKeys = "email" | "password"
type LoginDetails = Record<LoginKeys, string>
type LoginPayload = { token: string }

export async function login({}: LoginDetails): Promise<LoginPayload> {
  await sleep(Math.random() * 1500)

  if (Math.random() < 0.3) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < 0.3) {
    const fields = ["email"]
    const field = fields[Math.floor(Math.random() * 3)]
    console.log("random field", field)
    const message = `Invalid ${field}`
    const details = { field, tag: "invalid" } as const
    throw new BadRequest(message, details)
  }

  if (Math.random() < 0.1) {
    throw new ImATeapot("Unable to brew coffee")
  }

  return { token: crypto.randomUUID() }
}
