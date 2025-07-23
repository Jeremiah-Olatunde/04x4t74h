export function LinkPrimary({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="flex">
      <span className="text-primary text-xxs font-sora font-bold capitalize underline">
        {text}
      </span>
    </a>
  )
}
