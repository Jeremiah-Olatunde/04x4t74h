import { faker } from "@faker-js/faker"

export const CATEGORIES: readonly string[] = Array(faker.number.int(10))
  .fill(0)
  .map(faker.company.buzzNoun)
