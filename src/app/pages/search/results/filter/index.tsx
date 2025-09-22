import { useSearchParams } from "wouter"

import { useBusinessAllCache } from "@/hooks/business"
import * as RemoteData from "@/lib/remote-data"

import { Checkbox } from "@base-ui-components/react/checkbox"
import { CheckboxGroup } from "@base-ui-components/react/checkbox-group"
import { Field } from "@base-ui-components/react/field"
import { Fieldset } from "@base-ui-components/react/fieldset"
import { Form } from "@base-ui-components/react/form"

import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { WithControls as Header } from "@/components/header"
import {
  getAmenities,
  getCategories,
  getCities,
  getPaymentOptions,
  getSubcategoriesInCategory,
  getTags,
  getTownsInCity,
} from "@/utils/business"

export function Filters() {
  const term = useSearchTerm()
  const [filters, setFilters, paramsString] = useBusinessFilters()

  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, (businesses) => {
    const amenities = getAmenities(businesses)
    const categories = getCategories(businesses)
    const cities = getCities(businesses)
    const tags = getTags(businesses)
    const paymentOptions = getPaymentOptions(businesses)

    return { amenities, categories, cities, tags, businesses, paymentOptions }
  })

  return (
    <section className="min-h-screen">
      <Scroll.Auto.Top />
      <Scroll.Button.Top />

      <Topbar />

      <Form className="px-4 flex flex-col gap-6">
        <Header.Root>
          <Header.Content>
            <Header.Title>Filters</Header.Title>
            <Header.Subtitle>
              <span>Filter results for </span>
              <span className="font-semibold">"{term}"</span>
            </Header.Subtitle>
          </Header.Content>

          <Header.Control.Root>
            <Header.Control.Apply href={`/search/results?${paramsString}`} />
            <Header.Control.Reset
              href={`/search/results/filters?term=${term}`}
            />
          </Header.Control.Root>
        </Header.Root>

        <div />

        <Field.Root name="categories">
          <Fieldset.Root className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Fieldset.Legend>
                <div className="font-sora text-sm font-medium text-neutral-600">
                  Categories
                </div>
              </Fieldset.Legend>
              <button
                type="button"
                className="font-sora text-neutral-400 text-xs font-medium"
                onClick={() => {
                  setFilters("category", [])
                  setFilters("subcategory", [])
                }}
              >
                Clear
              </button>
            </div>

            <CheckboxGroup
              className="flex flex-row flex-wrap gap-2"
              value={filters.category}
              onValueChange={(values) => {
                setFilters("category", values.slice(-1))
                setFilters("subcategory", [])
              }}
            >
              {RemoteData.fold3Unsafe(data, {
                onNone: (): React.ReactNode => {
                  const items = Array(20)
                    .fill(0)
                    .map((_, i) => i)

                  return items.map((i) => {
                    const max = 8
                    const min = 15
                    const textLength = min + Math.random() * (max - min)
                    const text = "-".repeat(textLength)

                    return (
                      <Field.Label key={i}>
                        <div
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-transparent animate-pulse
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {text}
                        </div>
                      </Field.Label>
                    )
                  })
                },
                onSuccess: ({ categories }): React.ReactNode => {
                  return categories.map((category) => {
                    return (
                      <Field.Label key={category}>
                        <Checkbox.Root
                          value={category}
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {category}
                        </Checkbox.Root>
                      </Field.Label>
                    )
                  })
                },
              })}
            </CheckboxGroup>
          </Fieldset.Root>
        </Field.Root>

        {RemoteData.fold3Unsafe(data, {
          onNone: (): React.ReactNode => {
            return null
          },
          onSuccess: ({ businesses }): React.ReactNode => {
            if (filters.category.length === 0) return null
            const [category] = filters.category
            const subcategories = getSubcategoriesInCategory(
              businesses,
              category,
            )

            return (
              <Field.Root
                name="subcategories"
                className="bg-neutral-50/25 p-4 rounded-xl border-neutral-100 border-1"
              >
                <Fieldset.Root className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-between">
                    <Fieldset.Legend>
                      <div className="font-sora text-sm font-medium text-neutral-600">
                        Subcategories
                      </div>
                    </Fieldset.Legend>
                    <button
                      type="button"
                      className="font-sora text-neutral-400 text-xs font-medium"
                      onClick={() => setFilters("subcategory", [])}
                    >
                      Clear
                    </button>
                  </div>

                  <CheckboxGroup
                    className="flex flex-row flex-wrap gap-2"
                    value={filters.subcategory}
                    onValueChange={(values) =>
                      setFilters("subcategory", values)
                    }
                  >
                    {subcategories.map((subcategory) => {
                      return (
                        <Field.Label key={subcategory}>
                          <Checkbox.Root
                            value={subcategory}
                            className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                          >
                            {subcategory}
                          </Checkbox.Root>
                        </Field.Label>
                      )
                    })}
                  </CheckboxGroup>
                </Fieldset.Root>
              </Field.Root>
            )
          },
        })}

        <Field.Root name="tags">
          <Fieldset.Root className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Fieldset.Legend>
                <div className="font-sora text-sm font-medium text-neutral-600">
                  Tags
                </div>
              </Fieldset.Legend>
              <button
                type="button"
                className="font-sora text-neutral-400 text-xs font-medium"
                onClick={() => setFilters("tag", [])}
              >
                Clear
              </button>
            </div>

            <CheckboxGroup
              className="flex flex-row flex-wrap gap-2"
              value={filters.tag}
              onValueChange={(values) => {
                setFilters("tag", values)
              }}
            >
              {RemoteData.fold3Unsafe(data, {
                onNone: (): React.ReactNode => {
                  const items = Array(20)
                    .fill(0)
                    .map((_, i) => i)

                  return items.map((i) => {
                    const max = 8
                    const min = 15
                    const textLength = min + Math.random() * (max - min)
                    const text = "-".repeat(textLength)

                    return (
                      <Field.Label key={i}>
                        <div
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-transparent animate-pulse
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {text}
                        </div>
                      </Field.Label>
                    )
                  })
                },
                onSuccess: ({ tags }): React.ReactNode => {
                  return tags.map((tag) => {
                    return (
                      <Field.Label key={tag}>
                        <Checkbox.Root
                          value={tag}
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {tag}
                        </Checkbox.Root>
                      </Field.Label>
                    )
                  })
                },
              })}
            </CheckboxGroup>
          </Fieldset.Root>
        </Field.Root>

        <Field.Root name="amenities">
          <Fieldset.Root className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Fieldset.Legend>
                <div className="font-sora text-sm font-medium text-neutral-600">
                  Amenities
                </div>
              </Fieldset.Legend>
              <button
                type="button"
                className="font-sora text-neutral-400 text-xs font-medium"
                onClick={() => setFilters("amenity", [])}
              >
                Clear
              </button>
            </div>

            <CheckboxGroup
              className="flex flex-row flex-wrap gap-2"
              value={filters.amenity}
              onValueChange={(values) => {
                setFilters("amenity", values)
              }}
            >
              {RemoteData.fold3Unsafe(data, {
                onNone: (): React.ReactNode => {
                  const items = Array(20)
                    .fill(0)
                    .map((_, i) => i)

                  return items.map((i) => {
                    const max = 8
                    const min = 15
                    const textLength = min + Math.random() * (max - min)
                    const text = "-".repeat(textLength)

                    return (
                      <Field.Label key={i}>
                        <div
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-transparent animate-pulse
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {text}
                        </div>
                      </Field.Label>
                    )
                  })
                },
                onSuccess: ({ amenities }): React.ReactNode => {
                  return amenities.map((amenity) => {
                    return (
                      <Field.Label key={amenity}>
                        <Checkbox.Root
                          value={amenity}
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {amenity}
                        </Checkbox.Root>
                      </Field.Label>
                    )
                  })
                },
              })}
            </CheckboxGroup>
          </Fieldset.Root>
        </Field.Root>

        <Field.Root name="paymentOptions">
          <Fieldset.Root className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Fieldset.Legend>
                <div className="font-sora text-sm font-medium text-neutral-600">
                  Payment Options
                </div>
              </Fieldset.Legend>
              <button
                type="button"
                className="font-sora text-neutral-400 text-xs font-medium"
                onClick={() => setFilters("paymentOption", [])}
              >
                Clear
              </button>
            </div>

            <CheckboxGroup
              className="flex flex-row flex-wrap gap-2"
              value={filters.paymentOption}
              onValueChange={(values) => {
                setFilters("paymentOption", values)
              }}
            >
              {RemoteData.fold3Unsafe(data, {
                onNone: (): React.ReactNode => {
                  const items = Array(20)
                    .fill(0)
                    .map((_, i) => i)

                  return items.map((i) => {
                    const max = 8
                    const min = 15
                    const textLength = min + Math.random() * (max - min)
                    const text = "-".repeat(textLength)

                    return (
                      <Field.Label key={i}>
                        <div
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-transparent animate-pulse
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {text}
                        </div>
                      </Field.Label>
                    )
                  })
                },
                onSuccess: ({ paymentOptions }): React.ReactNode => {
                  return paymentOptions.map((paymentOption) => {
                    return (
                      <Field.Label key={paymentOption}>
                        <Checkbox.Root
                          value={paymentOption}
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {paymentOption}
                        </Checkbox.Root>
                      </Field.Label>
                    )
                  })
                },
              })}
            </CheckboxGroup>
          </Fieldset.Root>
        </Field.Root>

        <Field.Root name="cities">
          <Fieldset.Root className="flex flex-col gap-4">
            <div className="flex flex-row items-center justify-between">
              <Fieldset.Legend>
                <div className="font-sora text-sm font-medium text-neutral-600">
                  Cities
                </div>
              </Fieldset.Legend>
              <button
                type="button"
                className="font-sora text-neutral-400 text-xs font-medium"
                onClick={() => {
                  setFilters("city", [])
                  setFilters("town", [])
                }}
              >
                Clear
              </button>
            </div>

            <CheckboxGroup
              className="flex flex-row flex-wrap gap-2"
              value={filters.city}
              onValueChange={(values) => {
                setFilters("city", values.slice(-1))
                setFilters("town", [])
              }}
            >
              {RemoteData.fold3Unsafe(data, {
                onNone: (): React.ReactNode => {
                  const items = Array(20)
                    .fill(0)
                    .map((_, i) => i)

                  return items.map((i) => {
                    const max = 8
                    const min = 15
                    const textLength = min + Math.random() * (max - min)
                    const text = "-".repeat(textLength)

                    return (
                      <Field.Label key={i}>
                        <div
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-transparent animate-pulse
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {text}
                        </div>
                      </Field.Label>
                    )
                  })
                },
                onSuccess: ({ cities }): React.ReactNode => {
                  return cities.map((city) => {
                    return (
                      <Field.Label key={city}>
                        <Checkbox.Root
                          value={city}
                          className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                        >
                          {city}
                        </Checkbox.Root>
                      </Field.Label>
                    )
                  })
                },
              })}
            </CheckboxGroup>
          </Fieldset.Root>
        </Field.Root>

        {RemoteData.fold3Unsafe(data, {
          onNone: (): React.ReactNode => {
            return null
          },
          onSuccess: ({ businesses }): React.ReactNode => {
            if (filters.city.length === 0) return null
            const [city] = filters.city
            const towns = getTownsInCity(businesses, city)

            return (
              <Field.Root
                name="towns"
                className="bg-neutral-50/25 p-4 rounded-xl border-neutral-100 border-1"
              >
                <Fieldset.Root className="flex flex-col gap-4">
                  <div className="flex flex-row items-center justify-between">
                    <Fieldset.Legend>
                      <div className="font-sora text-sm font-medium text-neutral-600">
                        Towns
                      </div>
                    </Fieldset.Legend>
                    <button
                      type="button"
                      className="font-sora text-neutral-400 text-xs font-medium"
                      onClick={() => setFilters("town", [])}
                    >
                      Clear
                    </button>
                  </div>

                  <CheckboxGroup
                    className="flex flex-row flex-wrap gap-2"
                    value={filters.town}
                    onValueChange={(values) => setFilters("town", values)}
                  >
                    {towns.map((town) => {
                      return (
                        <Field.Label key={town}>
                          <Checkbox.Root
                            value={town}
                            className="
                            border-1 border-neutral-100 bg-neutral-50 px-3 py-2 rounded-xl font-sora font-medium text-xs text-neutral-400 capitalize
                            data-checked:bg-primary/5 data-checked:border-primary data-checked:text-primary 
                          "
                          >
                            {town}
                          </Checkbox.Root>
                        </Field.Label>
                      )
                    })}
                  </CheckboxGroup>
                </Fieldset.Root>
              </Field.Root>
            )
          },
        })}
      </Form>

      <div className="h-6" />
    </section>
  )
}

type BusinessFiltersKeys =
  | "amenity"
  | "category"
  | "city"
  | "paymentOption"
  | "subcategory"
  | "tag"
  | "town"

type BusinessFilters = Readonly<Record<BusinessFiltersKeys, string[]>>

function useBusinessFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  function setBusinessFilters(
    name: BusinessFiltersKeys,
    values: string[],
  ): void {
    setSearchParams(
      (prev) => {
        const _ = new URLSearchParams(prev)

        _.delete(name)

        values.forEach((v) => _.append(name, v))

        return _
      },
      { replace: true },
    )
  }

  const amenity = searchParams.getAll("amenity")
  const category = searchParams.getAll("category")
  const city = searchParams.getAll("city")
  const paymentOption = searchParams.getAll("paymentOption")
  const subcategory = searchParams.getAll("subcategory")
  const tag = searchParams.getAll("tag")
  const town = searchParams.getAll("town")

  const filters: BusinessFilters = {
    amenity,
    category,
    city,
    tag,
    subcategory,
    paymentOption,
    town,
  }

  return [filters, setBusinessFilters, searchParams.toString()] as const
}

function useSearchTerm() {
  const [searchParams] = useSearchParams()
  return searchParams.get("term") ?? ""
}
