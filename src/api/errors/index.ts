export class ApiError extends Error {
  code: number
  text: string
  constructor(code: number, text: string, message: string) {
    super(message)
    this.code = code
    this.text = text
  }
}

type BadRequestDetails = { field: string; tag: "invalid" }

export class BadRequest extends ApiError {
  details: BadRequestDetails
  constructor(message: string, details: BadRequestDetails) {
    super(400, "Bad Request", message)
    this.details = details
  }
}

export class Unauthorized extends ApiError {
  constructor(message: string) {
    super(401, "Unauthorized", message)
  }
}

type NotFoundPayload = {
  invalidParams: { name: string; reason: string }[]
}

export class NotFound extends ApiError {
  payload: NotFoundPayload
  constructor(message: string, payload: NotFoundPayload) {
    super(404, "Not Found", message)
    this.payload = payload
  }
}

type ConflictDetails = { field: string }

export class Conflict extends ApiError {
  details: ConflictDetails
  constructor(message: string, details: ConflictDetails) {
    super(409, "Conflict", message)
    this.details = details
  }
}

export class ImATeapot extends ApiError {
  constructor(message: string) {
    super(418, "I'm a teapot", message)
  }
}

export class TooManyRequests extends ApiError {
  constructor(message: string) {
    super(429, "Too Many Requests", message)
  }
}

export class InternalServerError extends ApiError {
  constructor(message: string) {
    super(500, "Internal Server Error", message)
  }
}

export class AutoLoginError extends ApiError {}
