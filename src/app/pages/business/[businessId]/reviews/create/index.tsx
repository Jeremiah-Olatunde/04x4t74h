import { useParams } from "wouter"

import { BadRequest } from "@/lib/errors/api"
import { PathParameterError } from "@/lib/errors/ui"

import { useBusinessOne } from "@/hooks/business"
import { LinkBack } from "@/components/link"
import type { BusinessLite } from "@/types/business"
import * as RemoteData from "@/lib/remote-data"
import { useState, type ReactNode } from "react"
import { Icon } from "@/components/icon"
import {
  MapPinIcon,
  ClockIcon,
  PiggyBankIcon,
  StarIcon,
  LoaderCircleIcon,
  CheckCheckIcon,
} from "lucide-react"
import {
  Field,
  FieldErrors,
  FieldLabel,
  FieldTextArea,
  Form,
  FormGroup,
} from "@/components/form-v2"

import { Controller, useForm } from "react-hook-form"
import { ButtonBadge } from "@/components/button"
import { createReview } from "@/api/endpoints/catalog/externalorganisation/[id]/reviews"
import { InvalidData, ReviewCreated } from "@/components/form-v2/banner"
import { useErrorBoundary } from "react-error-boundary"

export function ReviewCreate() {
  const { businessId } = useParams()

  if (businessId === undefined) {
    const tag = "missing"
    const details = { tag } as const
    const parameter = "id"
    const schema = "/business/:id"
    throw new PathParameterError(parameter, schema, details)
  }

  return (
    <section className="px-6 py-8 min-h-screen flex flex-col gap-8">
      <header className="relative flex justify-center items-center gap-4">
        <div className="absolute left-0 top-1/2 -translate-y-1/2">
          <LinkBack href={`~/business/${businessId}/home/menu`} />
        </div>
        <h1 className="font-sora text-xl text-neutral-700 font-bold">
          Leave a Review
        </h1>
      </header>

      <ReviewCreateForm businessId={businessId} />
    </section>
  )
}

type FormValues = {
  reviewBody: string
  reviewRating: number
}

const defaultValues: FormValues = {
  reviewBody: "",
  reviewRating: 0,
}

type ReviewCreateFormProps = { businessId: string }
function ReviewCreateForm({ businessId }: ReviewCreateFormProps) {
  const { showBoundary } = useErrorBoundary()
  const remoteData = useBusinessOne(businessId)

  const { control, handleSubmit, setValue, setError } = useForm<FormValues>({
    criteriaMode: "all",
    mode: "onChange",
    shouldUseNativeValidation: true,
    defaultValues,
  })

  type Status = RemoteData.RemoteData<unknown, null>
  const [status, setStatus] = useState<Status>(RemoteData.initial)

  type Banner = "ReviewCreated" | "InvalidData"
  const [banner, setBanner] = useState<null | Banner>(null)

  async function onSubmit(formValues: FormValues) {
    setBanner(null)
    setStatus(RemoteData.pending)

    try {
      await createReview(businessId, formValues)
      setStatus(RemoteData.success(null))
      setBanner("ReviewCreated")
    } catch (error) {
      setStatus(RemoteData.failure(error))

      if (error instanceof BadRequest) {
        const field = error.details.field

        const isReviewBody = field === "reviewBody"
        const isReviewRating = field === "reviewRating"

        if (!(isReviewBody || isReviewRating)) {
          throw error
        }

        const options = { shouldFocus: true }
        const fieldError = { types: { invalid: error.message } }
        setError(field, fieldError, options)
        setBanner("InvalidData")

        return
      }

      showBoundary(error)
      throw error
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className="grow-1 flex flex-col">
      <FormGroup name="create-review">
        {banner === "ReviewCreated" && <ReviewCreated />}
        {banner === "InvalidData" && <InvalidData />}

        {RemoteData.fold3(remoteData, {
          onFailure: (error): ReactNode => {
            throw error
          },
          onNone: (): ReactNode => {
            return <BusinessDetailsSkeleton />
          },
          onSuccess: (business): ReactNode => {
            return <BusinessDetails business={business} />
          },
        })}

        <Controller
          name="reviewRating"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required",
            },
            min: { value: 1, message: "Required" },
            max: { value: 5, message: "Out of range" },
          }}
          render={({ field, fieldState }) => {
            const errorMap = Object.values(fieldState.error?.types ?? {})
            const errors = errorMap.filter((e) => typeof e === "string")

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Leave a rating</FieldLabel>

                <input
                  {...field}
                  type="number"
                  id={field.name}
                  className="hidden"
                />
                <div className="flex gap-4 items-center">
                  <ul className="flex gap-1">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setValue("reviewRating", index + 1, {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            })
                          }}
                        >
                          <StarIcon
                            className={
                              index + 1 <= field.value
                                ? "text-secondary fill-secondary size-5"
                                : "text-neutral-200 fill-neutral-200 size-5"
                            }
                          />
                        </button>
                      ))}
                  </ul>
                  <span className="font-sora text-sm text-neutral-300 font-medium">
                    {field.value}.0
                  </span>
                </div>
                <FieldErrors errors={errors} />
              </Field>
            )
          }}
        />

        <Controller
          name="reviewBody"
          control={control}
          rules={{
            required: {
              value: true,
              message: "Required",
            },
            pattern: {
              value: /.*\S.*/,
              message: "Invalid Review",
            },
          }}
          render={({ field, fieldState }) => {
            const errorMap = Object.values(fieldState.error?.types ?? {})
            const errors = errorMap.filter((e) => typeof e === "string")

            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Write your review</FieldLabel>
                <FieldTextArea
                  {...field}
                  id={field.name}
                  autoComplete="off"
                  color={fieldState.invalid ? "red" : "neutral"}
                  placeholder="Write your review"
                />
                <FieldErrors errors={errors} />
              </Field>
            )
          }}
        />

        {RemoteData.fold(status, {
          onInitial: (): ReactNode => {
            return (
              <ButtonBadge type="submit" color="purple" size="lg">
                Share your experience!
              </ButtonBadge>
            )
          },
          onPending: (): ReactNode => {
            return (
              <ButtonBadge type="button" color="purple" size="lg">
                <LoaderCircleIcon className="animate-spin size-5" />
              </ButtonBadge>
            )
          },
          onFailure: (): ReactNode => {
            return (
              <ButtonBadge type="submit" color="purple" size="lg">
                Share your experience!
              </ButtonBadge>
            )
          },
          onSuccess: (): ReactNode => {
            return (
              <ButtonBadge type="button" color="purple" size="lg">
                <CheckCheckIcon className="size-5" />
              </ButtonBadge>
            )
          },
        })}
      </FormGroup>
    </Form>
  )
}

function BusinessDetailsSkeleton() {
  return (
    <div className="p-4 border-1 border-neutral-100 h-38 w-full rounded-xl flex gap-4">
      <div className="h-full w-40 rounded-xl bg-neutral-100 border-neutral-200 border-1 animate-pulse" />
      <div className="grow-1 flex flex-col gap-2">
        <div className="w-1/2 h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
        <div className="w-full h-6 bg-neutral-100 border-neutral-200 border-1 rounded-md animate-pulse" />
      </div>
    </div>
  )
}

type BusinessDetailsProps = { business: BusinessLite }
function BusinessDetails({ business }: BusinessDetailsProps) {
  return (
    <div className="p-4 border-1 border-neutral-100 bg-neutral-50 w-full rounded-xl flex gap-4">
      <div className="w-40 rounded-xl bg-neutral-300 border-neutral-300 border-1">
        <img src={business.logo} className="h-full w-full rounded-xl" />
      </div>

      <div className="grow-1 flex flex-col gap-2">
        <span className="font-sora font-bold text-xs">{business.name}</span>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={MapPinIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-neutral-400">
              {business.street} {business.town}
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={ClockIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-green-500 font-medium">
              Open
            </span>
            <span className="font-sora text-xxs text-neutral-400">
              07:00 &mdash; 21:00
            </span>
          </li>
          <li className="flex flex-row gap-2 items-center">
            <div className="self-start">
              <Icon icon={PiggyBankIcon} color="neutral" size="sm" />
            </div>
            <span className="font-sora text-xxs text-neutral-400">
              ₦15,000 to unlimited
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
