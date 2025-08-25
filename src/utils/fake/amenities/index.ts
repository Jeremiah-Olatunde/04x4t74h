import { faker } from "@faker-js/faker"

export const AMENITIES: readonly Readonly<{ name: string }>[] = Array(
  faker.number.int(20),
)
  .fill(0)
  .map(() => ({
    name: faker.lorem.words({ min: 1, max: 2 }),
  }))
