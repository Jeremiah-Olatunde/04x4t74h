import { useParams } from "wouter"
import { useState, type ReactNode } from "react"
import { Controller, useForm } from "react-hook-form"

import { BadRequest } from "@/lib/errors/api"
import { PathParameterError } from "@/lib/errors/ui"

import { Centered as Header } from "@/components/header"

import { useBusinessOneCache } from "@/hooks/business"
import type { BusinessLite } from "@/types/business"
import * as RemoteData from "@/lib/remote-data"
import { Icon } from "@/components/icon"

import { MapPinIcon, ClockIcon, PiggyBankIcon, StarIcon } from "lucide-react"

import * as Form from "@/components/form"

import { createReview } from "@/api/endpoints/catalog/externalorganisation/[id]/reviews"
import { useErrorBoundary } from "react-error-boundary"
import { Topbar } from "@/components/topbar"

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
    <section className="h-screen flex flex-col gap-6">
      <Topbar />

      <Header.Root>
        <Header.Title>Leave a Review</Header.Title>
        <Header.Subtitle>Share and shape the community</Header.Subtitle>
      </Header.Root>

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
  const remoteData = useBusinessOneCache(businessId)

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
    <Form.Root
      onSubmit={handleSubmit(onSubmit)}
      className="px-6 grow flex flex-col"
    >
      <Form.Group.Root name="create-review">
        {banner === "ReviewCreated" && <Form.Banner.ReviewCreated />}
        {banner === "InvalidData" && <Form.Banner.InvalidData />}

        {RemoteData.fold3Unsafe(remoteData, {
          onNone: (): ReactNode => <BusinessDetailsSkeleton />,
          onSuccess: (b): ReactNode => <BusinessDetails business={b} />,
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
              <Form.Field.Root>
                <Form.Field.Label htmlFor={field.name}>
                  Leave a rating
                </Form.Field.Label>

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
                <Form.Field.Errors errors={errors} />
              </Form.Field.Root>
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
              <Form.Field.Root>
                <Form.Field.Label htmlFor={field.name}>
                  Write your review
                </Form.Field.Label>
                <Form.Control.TextArea
                  {...field}
                  id={field.name}
                  autoComplete="off"
                  color={fieldState.invalid ? "red" : "neutral"}
                  placeholder="Write your review"
                />
                <Form.Field.Errors errors={errors} />
              </Form.Field.Root>
            )
          }}
        />

        {RemoteData.fold(status, {
          onInitial: (): ReactNode => <Form.Button.ShareYourExperience />,
          onPending: (): ReactNode => <Form.Button.Pending />,
          onFailure: (): ReactNode => <Form.Button.TryAgain />,
          onSuccess: (): ReactNode => <Form.Button.Success />,
        })}
      </Form.Group.Root>
    </Form.Root>
  )
}

function BusinessDetailsSkeleton() {
  return (
    <div className="p-4 border-1 border-neutral-100 w-full rounded-xl flex gap-4">
      <div className="h-32 w-40 rounded-xl bg-neutral-100 border-neutral-200 border-1 animate-pulse" />
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
    <div className="p-4 border-1 border-neutral-100 bg-neutral-50 w-full rounded-xl flex gap-4 justify-center items-center">
      <div className="flex h-32 w-40 rounded-xl bg-neutral-300 border-neutral-300 border-1">
        <img
          src={business.logo}
          className="object-cover w-full h-full rounded-xl"
        />
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
