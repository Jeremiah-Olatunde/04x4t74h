import { faker } from "@faker-js/faker"
import * as fake from "./fake.ts"

import fs from "node:fs"
import path from "node:path"
import url from "node:url"

type Streets = readonly string[]
type Towns = readonly (readonly [string, Streets])[]
type Cities = readonly (readonly [string, Towns])[]

function generateBusinesses() {
  const amenities = fake.amenities({ min: 10, max: 20 })
  const categories = fake.categories({ min: 4, max: 8 }).map((category) => {
    const subcategories = fake.categories({ min: 3, max: 5 })
    return [category, subcategories] as const
  })
  const paymentOptions = fake.paymentOptions()
  const tags = fake.tags({ min: 20, max: 30 })

  const cities: Cities = fake.cities({ min: 2, max: 4 }).map((city) => {
    const towns: Towns = fake.towns({ min: 5, max: 10 }).map((town) => {
      const streets: Streets = fake.streets({ min: 10, max: 20 })
      return [town, streets]
    })

    return [city, towns]
  })

  return cities.flatMap(([city, towns]) => {
    return towns.flatMap(([town, streets]) => {
      return streets.flatMap((street) => {
        const range = { min: 0, max: 2 }
        const [category, subcategories] = faker.helpers.arrayElement(categories)
        return fake.businesses(range, {
          amenities,
          category,
          subcategories,
          city,
          paymentOptions,
          street,
          tags,
          town,
        })
      })
    })
  })
}

const businesses = generateBusinesses()

console.log("businesses generated", businesses.length)

{
  const relativePath = `../../public/data/externalorganisation.json`
  const directory = path.dirname(url.fileURLToPath(import.meta.url))
  const filePath = path.resolve(directory, relativePath)
  fs.writeFileSync(filePath, JSON.stringify(businesses))
}

{
  businesses.map((b) => {
    const relativePath = `../../public/data/externalorganisation/${b.id}.json`
    const directory = path.dirname(url.fileURLToPath(import.meta.url))
    const filePath = path.resolve(directory, relativePath)
    fs.writeFileSync(filePath, JSON.stringify(b))
  })
}
