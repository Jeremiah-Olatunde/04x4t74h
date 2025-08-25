import { faker } from "@faker-js/faker"

export const STREETS: string[] = Array(100).fill(0).map(faker.location.street)
