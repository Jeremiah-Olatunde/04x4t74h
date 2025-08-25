import { faker } from "@faker-js/faker"

import type { Business, BusinessWithReviewsAndServices } from "@/types/business"

import {
  AMENITIES,
  CATEGORIES,
  CITIES,
  PAYMENT_OPTIONS,
  STREETS,
  TAGS,
  TOWNS,
} from "@/utils/fake"

export const BUSINESSES: readonly Business[] = Array(
  faker.number.int({ min: 50, max: 200 }),
)
  .fill(0)
  .map(() => {
    return {
      amenities: faker.helpers.arrayElements(AMENITIES),
      businessCategory: faker.helpers.arrayElement(CATEGORIES),
      businessSubCategory: [],
      city: faker.helpers.arrayElement(CITIES),
      description: faker.lorem.paragraph(),
      id: faker.string.uuid(),
      logo: "/images/business.jpg",
      name: faker.company.name(),
      paymentOptions: faker.helpers.arrayElements(PAYMENT_OPTIONS),
      rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
      street: faker.helpers.arrayElement(STREETS),
      telephone: faker.phone.number(),
      tags: faker.helpers.arrayElements(TAGS),
      town: faker.helpers.arrayElement(TOWNS),
    }
  })

export const BUSINESSES_WITH_REVIEWS_AND_SERVICES: readonly BusinessWithReviewsAndServices[] =
  BUSINESSES.map((business) => ({
    ...business,
    reviews: Array(faker.number.int({ min: 3, max: 30 }))
      .fill(0)
      .map(() => {
        return {
          id: faker.string.uuid(),
          createdOn: faker.date.past().toString(),
          reviewBody: faker.lorem.paragraph(),
          reviewRating: faker.number.float({
            min: 3,
            max: 5,
            fractionDigits: 1,
          }),
          reviewer: {
            name: faker.person.fullName(),
            email: faker.internet.email(),
            telephone: faker.phone.number(),
          },
        }
      }),
    services: Array(faker.number.int({ min: 3, max: 30 }))
      .fill(0)
      .map(() => {
        return {
          id: faker.string.uuid(),
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          priceSpecification: {
            price: faker.number.int({ min: 5, max: 50 }) * 1000,
            priceCurrency: "₦",
          },
        }
      }),
  }))
