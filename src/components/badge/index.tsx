export function Badge({
  text,
  variant,
}: {
  text: string
  variant: "primary" | "secondary" | "tertiary"
}) {
  return (
    <div
      className={`${variant === "primary" ? "bg-primary/10" : variant === "secondary" ? "bg-secondary" : variant === "tertiary" ? "bg-neutral-100" : null} flex items-center justify-center rounded-s-full rounded-e-full px-3 py-1`}
    >
      <span
        className={`text-xxs ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-neutral-600" : variant === "tertiary" ? "text-neutral-600" : null} font-sora font-medium`}
      >
        {text}
      </span>
    </div>
  )
}
