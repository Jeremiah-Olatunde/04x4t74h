import { faker } from "@faker-js/faker"

export const TAGS: readonly Readonly<{ name: string }>[] = Array(
  faker.number.int(30),
)
  .fill(0)
  .map(() => ({
    name: faker.lorem.word(),
  }))
