import {
  ImATeapot,
  InternalServerError,
  TooManyRequests,
  Unauthorized,
} from "@/lib/errors/api"
import { DURATION, PROBABILITY_LOW } from "@/config"
import type { Business } from "@/types/business"
import { sleep } from "@/utils"

export async function fetchBusinessAll(): Promise<readonly Business[]> {
  const path = "/data/externalorganisation.json"
  const headers = { "Content-Type": "application/json" }

  const promise = fetch(path, { headers })

  await sleep(Math.random() * DURATION)

  const response = await promise

  if (Math.random() < PROBABILITY_LOW) {
    throw new Unauthorized("Invalid credentials")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new ImATeapot("Who do I look like James Hoffman")
  }

  if (Math.random() < PROBABILITY_LOW) {
    throw new InternalServerError(
      "An unexpected error occurred while processing your request",
    )
  }

  if (Math.random() < PROBABILITY_LOW) {
    const time = Math.ceil(Math.random() * 120)
    throw new TooManyRequests(`Try again after ${time} seconds`)
  }

  if (!response.ok) throw response

  const businesses: readonly Business[] = await response.json()
  return businesses
}

type BusinessCacheAll = null | readonly Business[]
type BusinessCacheOne = Readonly<Record<string, Business>>
type BusinessCache = { all: BusinessCacheAll; one: BusinessCacheOne }

export async function fetchBusinessAllCache(
  cache: BusinessCache,
): Promise<[BusinessCache, readonly Business[]]> {
  if (cache.all !== null) {
    console.log("[cache hit] Business All")
    return [cache, cache.all]
  }

  console.log("[cache miss] Business All")

  const all = await fetchBusinessAll()
  const one = Object.fromEntries(all.map((b) => [b.id, b] as const))

  console.log("Cache State", { all, one })

  return [{ all, one }, all]
}
