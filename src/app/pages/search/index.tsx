import { useEffect, type ReactNode } from "react"
import { Link, Link as LinkWouter, useLocation, useSearchParams } from "wouter"
import { Form } from "@base-ui-components/react/form"
import { Field } from "@base-ui-components/react/field"
import { Input } from "@base-ui-components/react/input"
import { Controller, useForm } from "react-hook-form"
import {
  BedDoubleIcon,
  EyeClosedIcon,
  LandmarkIcon,
  MartiniIcon,
  MountainIcon,
  SearchIcon,
  SlidersHorizontalIcon,
  UtensilsCrossedIcon,
} from "lucide-react"

import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { Pill } from "@/components/pill"
import { Chips } from "@/features/business/components/filter"
import * as Url from "@/features/business/lib/url"
import * as RemoteData from "@/lib/remote-data"
import { Query } from "@/features/business/lib"
import { useBusinessAllCache } from "@/hooks/business"

export * from "./filter"
export * from "./results"
export { Filters as ResultsFilters } from "./results/filter"

type FormValues = { term: string }

export function Search() {
  const [, setLocation] = useLocation()
  const [params, setParams] = useSearchParams()

  const term = params.get("term") ?? ""

  const defaultValues: FormValues = { term }

  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, (businesses) => {
    const tags = Query.getTags(businesses)
    const categories = Query.getCategories(businesses)
    return { tags, categories }
  })

  const {
    control,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  const chips = Url.enumerate(params)

  useEffect(() => {
    setFocus("term")
  }, [setFocus])

  useEffect(() => {
    const { unsubscribe } = watch(({ term }) => {
      if (term === undefined) {
        return
      }

      const clone = new URLSearchParams(params)
      clone.set("term", term)
      setParams(clone, { replace: true })
    })
    return () => unsubscribe()
  }, [watch])

  return (
    <section className="relative flex flex-col min-h-svh">
      <Scroll.Button.Top />
      <Topbar />

      <section className="p-6 pt-0 flex flex-col gap-6">
        <Form
          className={`
              h-12
              flex justify-center items-stretch gap-2 
              bg-neutral-50 transition p-1 
              outline-2 outline-transparent 
              border-1 border-neutral-100 rounded-full 
              has-focus:shadow-md/10 has-focus:border-neutral-400 has-focus:outline-primary
              ${Object.entries(errors).length !== 0 && "!border-red-200 outline-transparent has-focus:outline-red-600"}
          `}
          onSubmit={handleSubmit(() =>
            setLocation(`/search/results?${params.toString()}`),
          )}
        >
          <ButtonSearch />
          <Controller
            name="term"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Required",
              },
              pattern: {
                value: /.*\S.*/,
                message: "Invalid Search",
              },
            }}
            render={({ field, fieldState }) => {
              const errorMap = Object.values(fieldState.error?.types ?? {})
              const errors = errorMap.filter((e) => typeof e === "string")

              return (
                <Field.Root className="flex grow justify-between items-center">
                  <Input
                    id={field.name}
                    {...field}
                    placeholder="Search businesses on Plazzaa..."
                    className="
                      w-0 grow 
                      font-sora text-xs text-neutral-600 
                      border-none outline-none
                      placeholder:text-neutral-400
                    "
                  />
                  {errors.slice(0, 1).map((error) => {
                    return (
                      <Pill key={error} color="red" size="sm">
                        {error}
                      </Pill>
                    )
                  })}
                </Field.Root>
              )
            }}
          />
          <ButtonFilter href={`/search/filters?${params.toString()}`} />
        </Form>

        <Chips chips={chips} />

        <div className="flex flex-col gap-10">
          {RemoteData.fold3Unsafe(data, {
            onNone: (): ReactNode => {
              return (
                <div className="flex flex-row gap-2 w-full overflow-x-scroll no-scrollbar">
                  {Array(20)
                    .fill(0)
                    .map((_, index) => {
                      const count = 5 + Math.floor(Math.random() * 8)
                      const text = "x".repeat(count)
                      return (
                        <div key={index}>
                          <div className="p-2 bg-neutral-50 border-1 border-neutral-100 rounded-lg">
                            <div className="capitalize font-sora text-xxs text-transparent">
                              {text}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              )
            },
            onSuccess: ({ tags }): ReactNode => {
              const items = tags.map((tag) => {
                return [tag, `/discover/tags/${tag}`] as const
              })

              return (
                <ul className="flex flex-row gap-2 w-full overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                  {items.map(([name, href]) => {
                    return (
                      <li key={name} className="snap-start">
                        <Link href={href}>
                          <div className="p-2 bg-neutral-50 border-1 border-neutral-100 rounded-lg">
                            <div className="capitalize font-sora text-xxs text-neutral-400">
                              {name}
                            </div>
                          </div>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              )
            },
          })}
        </div>

        <div className="flex flex-col gap-2">
          <div className="capitalize font-sora text-sm font-medium text-neutral-600">
            Categories
          </div>

          <div className="flex flex-col gap-10">
            {RemoteData.fold3Unsafe(data, {
              onNone: (): ReactNode => {
                return (
                  <div className="flex flex-row gap-2 w-full overflow-x-scroll no-scrollbar">
                    {Array(20)
                      .fill(0)
                      .map((_, index) => {
                        const count = 5 + Math.floor(Math.random() * 8)
                        const text = "x".repeat(count)
                        return (
                          <div key={index}>
                            <div className="flex gap-2 items-center p-4 bg-neutral-50 border-1 border-neutral-100 rounded-lg">
                              <MountainIcon className="text-transparent size-4" />
                              <div className="capitalize font-sora text-xs text-transparent">
                                {text}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                )
              },
              onSuccess: ({ categories }): ReactNode => {
                const items = categories.map((category) => {
                  return [category, `/discover/categories/${category}`] as const
                })

                return (
                  <ul className="flex flex-row gap-2 w-full overflow-x-scroll no-scrollbar snap-x snap-mandatory">
                    {items.map(([name, href]) => {
                      const icons = [
                        BedDoubleIcon,
                        UtensilsCrossedIcon,
                        EyeClosedIcon,
                        MartiniIcon,
                        MountainIcon,
                        LandmarkIcon,
                      ]

                      const index = Math.floor(Math.random() * icons.length)
                      const Icon = icons[index]

                      return (
                        <li key={name} className="snap-start">
                          <Link href={href}>
                            <div className="flex gap-2 items-center p-4 bg-neutral-50 border-1 border-neutral-100 rounded-lg">
                              <Icon className="text-neutral-400 size-4" />
                              <div className="capitalize font-sora text-xs text-neutral-400">
                                {name}
                              </div>
                            </div>
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )
              },
            })}
          </div>
        </div>
      </section>
    </section>
  )
}

function ButtonSearch() {
  return (
    <button
      type="submit"
      className="h-full rounded-full aspect-square flex items-center justify-center"
    >
      <SearchIcon className="size-5 text-neutral-600" />
    </button>
  )
}

type ButtonFilterProps = { href: string }
function ButtonFilter({ href }: ButtonFilterProps) {
  return (
    <LinkWouter
      href={href}
      className="h-full rounded-full aspect-square bg-neutral-200/50 flex items-center justify-center"
    >
      <SlidersHorizontalIcon className="size-5 text-primary stroke-3" />
    </LinkWouter>
  )
}
