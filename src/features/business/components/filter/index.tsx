import { useSearchParams } from "wouter"
import type { ReactNode } from "react"

import * as RemoteData from "@/lib/remote-data"
import * as Form from "@/components/filter"
import * as Chips_ from "@/components/filter/chips"

import * as Url from "@/features/business/lib/url"
import { useBusinessAllCache } from "@/hooks/business"

import { Query } from "@/features/business/lib"

type FieldProps = {
  label: string
  param: Url.Name
  select: "single" | "multiple"
  values: readonly string[]
  subfield?: boolean
}

export function Field({ label, param, select, values, subfield }: FieldProps) {
  const [params, setParams] = useSearchParams()

  if (values.length === 0) {
    return null
  }

  return (
    <Form.Field.Root name={label} subfield={subfield}>
      <Form.Field.Header.Root>
        <Form.Field.Header.Title>{label}</Form.Field.Header.Title>
        <Form.Field.Header.Clear
          handleClick={() => {
            const next = Url.clear(params, param)
            setParams(next)
          }}
        />
      </Form.Field.Header.Root>

      <Form.Field.Group
        value={params.getAll(param)}
        onValueChange={(selected) => {
          const value = select === "multiple" ? selected : selected.slice(-1)
          const next = Url.set(params, param, value)
          setParams(next)
        }}
      >
        {values.map((item) => {
          return <Form.Field.Option key={item} value={item} />
        })}
      </Form.Field.Group>
    </Form.Field.Root>
  )
}

export function Amenities() {
  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, Query.getAmenities)

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => <Form.Skeleton.Field count={7} />,
    onSuccess: (values): ReactNode => {
      return (
        <Field
          label="amenities"
          param="amenity"
          select="multiple"
          values={values}
        />
      )
    },
  })
}

export function Tags() {
  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, Query.getTags)

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => <Form.Skeleton.Field count={24} />,
    onSuccess: (values): ReactNode => {
      return (
        <Field label="tags" param="tag" select="multiple" values={values} />
      )
    },
  })
}

export function PaymentOptions() {
  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, Query.getPaymentOptions)

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => <Form.Skeleton.Field count={20} />,
    onSuccess: (values): ReactNode => {
      return (
        <Field
          label="paymentOptions"
          param="paymentOption"
          select="multiple"
          values={values}
        />
      )
    },
  })
}

export function Cities() {
  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, Query.getCities)

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => <Form.Skeleton.Field count={3} />,
    onSuccess: (values): ReactNode => {
      return (
        <Field label="cities" param="city" select="single" values={values} />
      )
    },
  })
}

export function Towns() {
  const [params] = useSearchParams()
  const city = params.get("city")

  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    if (city === null) return []
    const filtrate = businesses.filter((business) => business.city === city)
    return Query.getTowns(filtrate)
  })

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => null,
    onSuccess: (values): ReactNode => {
      return (
        <Field
          label="towns"
          param="town"
          select="multiple"
          values={values}
          subfield
        />
      )
    },
  })
}

export function Categories() {
  const remoteData = useBusinessAllCache()
  const data = RemoteData.map(remoteData, Query.getCategories)

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => <Form.Skeleton.Field count={5} />,
    onSuccess: (values): ReactNode => {
      return (
        <Field
          label="categories"
          param="category"
          select="single"
          values={values}
        />
      )
    },
  })
}

export function Subcategories() {
  const [params] = useSearchParams()
  const category = params.get("category")

  const remoteData = useBusinessAllCache()

  const data = RemoteData.map(remoteData, (businesses) => {
    if (category === null) return []
    const filtrate = businesses.filter(({ category: c }) => c === category)
    return Query.getSubcategories(filtrate)
  })

  return RemoteData.fold3Unsafe(data, {
    onNone: (): ReactNode => null,
    onSuccess: (values): ReactNode => {
      return (
        <Field
          label="subcategories"
          param="subcategory"
          select="multiple"
          values={values}
          subfield
        />
      )
    },
  })
}

type ChipsProps = {
  chips: readonly (readonly [string, string])[]
}

export function Chips({ chips }: ChipsProps) {
  if (0 === chips.length) {
    return null
  }

  return (
    <Chips_.Root>
      {chips.map(([name, value]) => {
        return (
          <Chips_.Chip key={`${name}:${value}`} name={name} value={value} />
        )
      })}
    </Chips_.Root>
  )
}
