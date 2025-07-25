type ButtonType = "submit" | "button"

type ButtonProps = {
  type: ButtonType
  text: string
  variant: "primary" | "secondary"
  handleClick?: (text: string) => void
}

export function Button({ type, text, variant, handleClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handleClick ? () => handleClick(text) : () => {}}
      className={`font-sora w-full cursor-pointer rounded-xl p-4 text-sm font-medium capitalize ${variant === "primary" ? "bg-primary" : variant === "secondary" ? "bg-secondary" : null} ${variant === "primary" ? "text-white" : variant === "secondary" ? "text-neutral-600" : null} `}
    >
      {text}
    </button>
  )
}
