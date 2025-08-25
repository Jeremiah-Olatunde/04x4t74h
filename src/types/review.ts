export type Review = Readonly<{
  id: string
  createdOn: string
  reviewBody: string
  reviewRating: number
  reviewer: Readonly<Record<"name" | "email" | "telephone", string>>
}>
