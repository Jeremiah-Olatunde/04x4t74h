import * as F from "../field"

export function Field({ count }: { count: number }) {
  return (
    <div className="flex flex-col gap-4">
      <F.Header.Root>
        <F.Header.Skeleton.Title />
        <F.Header.Skeleton.Clear />
      </F.Header.Root>

      <F.Skeleton.Group>
        {Array(count)
          .fill(0)
          .map((_, index) => {
            return <F.Skeleton.Option key={index} />
          })}
      </F.Skeleton.Group>
    </div>
  )
}
