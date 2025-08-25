import { faker } from "@faker-js/faker"

import type { Business, BusinessWithReviewsAndServices } from "@/types/business"
import type { Review } from "@/types/review"
import type { Service } from "@/types/service"

const CATEGORIES: readonly string[] = Array(faker.number.int(10))
  .fill(0)
  .map(faker.company.buzzNoun)

export function business(fixed: Partial<Business> = {}): Business {
  return {
    amenities: Array(faker.number.int(10))
      .fill(0)
      .map(() => ({
        name: faker.lorem.words({ min: 1, max: 2 }),
      })),
    businessCategory: faker.helpers.arrayElement(CATEGORIES),
    businessSubCategory: [],
    city: faker.location.city(),
    description: faker.lorem.paragraph(),
    id: faker.string.uuid(),
    logo: "/images/business.jpg",
    name: faker.company.name(),
    paymentOptions: faker.helpers.arrayElements(["CARD", "CASH", "TRANSFER"]),
    rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    street: faker.location.street(),
    telephone: faker.phone.number(),
    tags: Array(faker.number.int(10))
      .fill(0)
      .map(() => ({
        name: faker.lorem.word(),
      })),
    town: faker.location.county(),
    ...fixed,
  }
}

export function businessWithReviewsAndServices(
  fixed: Partial<BusinessWithReviewsAndServices> = {},
): BusinessWithReviewsAndServices {
  return {
    ...business(),
    reviews: Array(faker.number.int(10)).fill(0).map(review),
    services: Array(faker.number.int(10)).fill(0).map(service),
    ...fixed,
  }
}

export function review(): Review {
  return {
    id: faker.string.uuid(),
    createdOn: faker.date.past().toString(),
    reviewBody: faker.lorem.paragraph(),
    reviewRating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
    reviewer: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      telephone: faker.phone.number(),
    },
  }
}

export function service(): Service {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    priceSpecification: {
      price: faker.number.int({ min: 5, max: 50 }) * 1000,
      priceCurrency: "₦",
    },
  }
}
