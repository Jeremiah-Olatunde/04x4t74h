import {
  useState,
  type ComponentPropsWithRef,
  type PropsWithChildren,
} from "react"

import { ButtonBadge } from "@/components/button"

import { Card } from "@/features/business/components"
import type { Business } from "@/features/business/types/"

type GridProps = { businesses: readonly Business[] }

export function CardGrid({ businesses }: GridProps) {
  const increment = 4
  const [show, setShow] = useState(8)

  return (
    <div className="flex flex-col gap-4">
      <Root>
        {businesses.slice(0, show).map((business) => {
          return (
            <Item key={business.id}>
              <div className="h-60">
                <Card business={business} />
              </div>
            </Item>
          )
        })}
      </Root>

      {show < businesses.length && (
        <ShowMore onClick={() => setShow(show + increment)} />
      )}
      <div />
    </div>
  )
}

type RootProps = {}
function Root({ children }: PropsWithChildren<RootProps>) {
  return <ul className="grid grid-cols-2 gap-2">{children}</ul>
}

type ItemProps = {}
function Item({ children }: PropsWithChildren<ItemProps>) {
  return <li>{children}</li>
}

type ShowMoreProps = ComponentPropsWithRef<"button">
export function ShowMore(props: ShowMoreProps) {
  return (
    <ButtonBadge {...props} color="neutral" size="md" type="button">
      Show More
    </ButtonBadge>
  )
}
