import * as fake from "./fake.ts"

import fs from "node:fs"
import path from "node:path"
import url from "node:url"

const relativePath = "../../public/data/externalorganisation.json"
const directory = path.dirname(url.fileURLToPath(import.meta.url))
const filePath = path.resolve(directory, relativePath)

const cities = (function () {
  const cities = fake.cities({ min: 2, max: 4 }).map((city) => {
    const towns = fake.towns({ min: 5, max: 10 }).map((town) => {
      const streets = fake.streets({ min: 10, max: 20 })
      return [town, streets] as const
    })

    return [city, towns] as const
  })

  return cities
})()

const businesses = (function () {
  const amenities = fake.amenities({ min: 10, max: 20 })
  const categories = fake.categories({ min: 5, max: 10 })
  const paymentOptions = fake.paymentOptions()
  const tags = fake.tags({ min: 20, max: 30 })

  return cities.flatMap(([city, towns]) => {
    return towns.flatMap(([town, streets]) => {
      return streets.flatMap((street) => {
        const range = { min: 0, max: 2 }
        return fake.businesses(range, {
          amenities,
          categories,
          city,
          paymentOptions,
          street,
          tags,
          town,
        })
      })
    })
  })
})()

console.log("businesse generated", businesses.length)
fs.writeFileSync(filePath, JSON.stringify(businesses))
