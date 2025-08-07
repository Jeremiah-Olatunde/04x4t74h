import { faker } from "@faker-js/faker"

import type { Business } from "@/types/business"

export function mockBusiness(): Business {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    city: faker.location.city(),
    town: faker.location.county(),
    street: faker.location.street(),
    logo: "/images/business.jpg",
    rating:
      faker.number.int({ min: 3, max: 4 }) +
      faker.number.int({ min: 1, max: 9 }) / 10,
  }
}
