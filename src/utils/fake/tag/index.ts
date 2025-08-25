import { faker } from "@faker-js/faker"

export const TAGS: readonly string[] = Array(faker.number.int(30))
  .fill(0)
  .map(faker.lorem.word)
