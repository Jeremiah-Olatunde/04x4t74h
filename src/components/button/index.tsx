type ButtonType = "submit" | "button"

type ButtonProps = {
  type: ButtonType
  text: string
  handleClick?: (text: string) => void
}

export function ButtonPrimary({ type, text, handleClick }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={handleClick ? () => handleClick(text) : () => {}}
      className="bg-primary font-sora cursor-pointer rounded-xl p-4 text-sm font-medium text-white capitalize"
    >
      {text}
    </button>
  )
}
