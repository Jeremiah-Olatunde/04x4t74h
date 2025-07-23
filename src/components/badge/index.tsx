export function Badge({
  text,
  variant,
}: {
  text: string
  variant: "primary" | "secondary" | "tertiary"
}) {
  return (
    <div
      className={`${variant === "primary" ? "bg-primary/10" : variant === "secondary" ? "bg-secondary/10" : variant === "tertiary" ? "bg-neutral-100" : null} flex items-center justify-center rounded-s-full rounded-e-full px-3 py-1`}
    >
      <span
        className={`text-xs ${variant === "primary" ? "text-primary" : variant === "secondary" ? "text-secondary" : variant === "tertiary" ? "text-neutral-400" : null} font-sora font-medium`}
      >
        {text}
      </span>
    </div>
  )
}
