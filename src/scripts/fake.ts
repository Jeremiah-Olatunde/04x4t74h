import { faker } from "@faker-js/faker"

import type { BusinessLite, Business } from "@/types/business"

type Range = { min: number; max: number }

export function amenities(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count)
    .fill(0)
    .map(() => faker.lorem.words({ min: 1, max: 2 }))
}

export function categories(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count).fill(0).map(faker.company.buzzNoun)
}

export function cities(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count).fill(0).map(faker.location.city)
}

export function paymentOptions(): readonly string[] {
  const PAYMENT_OPTIONS = ["CARD", "CASH", "TRANSFER"]
  return faker.helpers.arrayElements(PAYMENT_OPTIONS)
}

export function streets(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count).fill(0).map(faker.location.street)
}

export function tags(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count).fill(0).map(faker.lorem.word)
}

export function towns(range: Range): readonly string[] {
  const count = faker.number.int(range)
  return Array(count).fill(count).map(faker.location.county)
}

type Config = Readonly<{
  amenities: readonly string[]
  categories: readonly string[]
  city: string
  street: string
  tags: readonly string[]
  town: string
  paymentOptions: readonly string[]
}>

export function businesses(
  range: Range,
  config: Config,
): readonly BusinessLite[] {
  return businessesWithReviewsAndServices(range, config)
}

export function businessesWithReviewsAndServices(
  range: Range,
  config: Config,
): readonly Business[] {
  const count = faker.number.int(range)
  return Array(count)
    .fill(0)
    .map(() => ({
      amenities: faker.helpers.arrayElements(config.amenities),
      businessCategory: faker.helpers.arrayElement(config.categories),
      businessSubCategory: [],
      city: config.city,
      description: faker.lorem.paragraph(),
      id: faker.string.uuid(),
      logo: "/images/business.jpg",
      // logo: faker.image.urlPicsumPhotos({
      //   width: faker.number.int({ min: 300, max: 600 }),
      //   height: faker.number.int({ min: 300, max: 600 }),
      //   blur: 0,
      //   grayscale: false,
      // }),
      name: faker.company.name(),
      openingHours: [
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "MONDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "TUESDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "WEDNESDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "THURSDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "FRIDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "SATURDAY" },
        { opens: "T09:00:00Z", closes: "T09:00:00Z", dayOfWeek: "SUNDAY" },
      ],
      paymentOptions: faker.helpers.arrayElements(config.paymentOptions),
      rating: faker.number.float({ min: 3, max: 5, fractionDigits: 1 }),
      street: config.street,
      telephone: faker.phone.number(),
      tags: faker.helpers.arrayElements(config.tags, { min: 2, max: 5 }),
      town: config.town,
      reviews: Array(faker.number.int({ min: 3, max: 30 }))
        .fill(0)
        .map(() => {
          return {
            id: faker.string.uuid(),
            createdOn: faker.date.past().toString(),
            reviewBody: faker.lorem.paragraph(),
            reviewRating: faker.number.float({
              min: 1,
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
}
