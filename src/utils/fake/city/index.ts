import { faker } from "@faker-js/faker"

export const CITIES: string[] = Array(4).fill(0).map(faker.location.city)
