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
