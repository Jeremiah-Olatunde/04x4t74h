import { ApiError } from "@/lib/errors/api"

export class AutoLoginError extends ApiError {}

type PathParameterDetails =
  | { tag: "missing" }
  | { tag: "invalid"; value: string }

export class PathParameterError extends Error {
  details: PathParameterDetails
  parameter: string
  schema: string
  constructor(
    parameter: string,
    schema: string,
    details: PathParameterDetails,
  ) {
    const message =
      details.tag === "missing"
        ? `[${details.tag}] ${parameter}`
        : `[${details.tag}] ${parameter}=${details.value}`

    super(message)
    this.parameter = parameter
    this.details = details
    this.schema = schema
  }
}
