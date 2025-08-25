type Stringable =
  | {
      [index: string]: unknown
      toString: <T extends unknown[]>(...x: T) => string
    }
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined

export function tw(xs: readonly string[], ...values: Stringable[]): string {
  return String.raw({ raw: xs }, ...values)
}
