export function Tab({ text }: { text: string }) {
  return (
    <li>
      <div className="text-xs text-transparent p-1 bg-neutral-100 border-1 border-neutral-200 animate-pulse rounded-sm">
        {text}
      </div>
    </li>
  )
}
