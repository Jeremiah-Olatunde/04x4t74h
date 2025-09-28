import { Link as LinkWouter, useLocation, useSearchParams } from "wouter"
import { Form } from "@base-ui-components/react/form"
import { Field } from "@base-ui-components/react/field"
import { Input } from "@base-ui-components/react/input"
import { Controller, useForm } from "react-hook-form"
import { SearchIcon, SlidersHorizontalIcon } from "lucide-react"

import * as Scroll from "@/components/scroll"

import { Topbar } from "@/components/topbar"
import { Pill } from "@/components/pill"
import { useEffect } from "react"

export * from "./filter"
export * from "./results"
export { Filters as ResultsFilters } from "./results/filter"

type FormValues = { term: string }

export function Search() {
  const [, setLocation] = useLocation()
  const [params, setParams] = useSearchParams()

  const term = params.get("term") ?? ""

  const defaultValues: FormValues = { term }

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  useEffect(() => {
    const { unsubscribe } = watch(({ term }) => {
      if (term === undefined) {
        return
      }

      const clone = new URLSearchParams(params)
      clone.set("term", term)
      setParams(clone)
    })
    return () => unsubscribe()
  }, [watch])

  return (
    <section className="relative flex flex-col min-h-svh">
      <Scroll.Button.Top />
      <Topbar />

      <section className="p-6 pt-0 flex flex-col gap-4">
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
