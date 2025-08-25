import { faker } from "@faker-js/faker"

export const TOWNS: string[] = Array(30).fill(0).map(faker.location.county)
