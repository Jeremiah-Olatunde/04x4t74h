export function LinkPrimary({ href, text }: { href: string; text: string }) {
  return (
    <a href={href} className="flex">
      <span className="text-primary font-sora text-xs font-bold underline">
        {text}
      </span>
    </a>
  )
}
