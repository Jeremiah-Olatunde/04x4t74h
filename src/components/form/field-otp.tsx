import * as Option from "@/lib/fp-ts/Option.ts"
import * as IOOption from "@/lib/fp-ts/IOOption.ts"
import * as Function from "@/lib/fp-ts/Function.ts"
import * as Number from "@/lib/fp-ts/Number.ts"
import * as Array from "@/lib/fp-ts/ReadonlyArray.ts"
import { useState } from "react"

type OtpDigit = Option.Option<number>
type Otp = readonly OtpDigit[]

export function FieldOtp() {
  const initialOtp = Array.replicate(8, Option.none)
  const [otp, setOtp] = useState<Otp>(initialOtp)
  const [focused, setFocused] = useState(0)

  return (
    <div className="grid grid-cols-8 gap-1">
      {Function.pipe(
        otp,
        Array.mapWithIndex((index, digit) => {
          return (
            <FieldOtpInput
              focused={focused === index}
              handleChange={(index) => (value) => {
                Function.pipe(
                  otp,
                  Array.updateAt(index, Option.of(value)),
                  IOOption.fromOption,
                  IOOption.tapIO((otp) => () => setOtp(otp)),
                  IOOption.flatMap(
                    Function.flow(
                      Array.findIndex(Option.isNone),
                      IOOption.fromOption,
                    ),
                  ),
                  IOOption.map(setFocused),
                  IOOption.unsafeExpect("OutOfBounds: invalid focus"),
                )
              }}
              index={index}
              key={index}
              ref={() => {}}
              value={digit}
              handleFocus={(index) => {
                if (focused < index) return
                console.log(focused, index)
                setFocused(index)
              }}
            />
          )
        }),
      )}
    </div>
  )
}

function FieldOtpInput({
  index,
  value,
  focused,
  handleFocus,
  handleChange,
}: {
  index: number
  value: Option.Option<number>
  focused: boolean
  handleFocus: (index: number) => void
  handleChange: (index: number) => (value: number) => void
  ref: (ref: Option.Option<HTMLInputElement>) => void
}) {
  const toString = Option.fold(Function.constant(""), Number.toString)

  return (
    <div className="has-focus:outline-primary flex aspect-square justify-center gap-2 rounded-md border-1 border-neutral-200 bg-neutral-50 p-1 outline-1 outline-transparent transition has-focus:border-neutral-400 has-focus:shadow-md/10">
      <input
        id={Function.pipe(index, Number.toString)}
        name={Function.pipe(index, Number.toString)}
        onFocus={(event) => {
          event.preventDefault()
          event.stopPropagation()
          handleFocus(index)
        }}
        value={Function.pipe(value, toString)}
        onChange={(event) => {
          console.log(Number.integerFromString(event.target.value))
          Function.pipe(
            IOOption.of(event.target.value),
            IOOption.tapIO(() => () => event.stopPropagation()),
            IOOption.tapIO(() => () => event.preventDefault()),
            IOOption.flatMap((n) =>
              IOOption.fromOption(
                Function.pipe(
                  Number.integerFromString(n),
                  Option.map(Number.digits),
                  Option.flatMap(Array.last),
                ),
              ),
            ),
            IOOption.map(handleChange(index)),
            IOOption.execute,
          )
        }}
        ref={(element) => {
          Function.pipe(
            IOOption.fromNullable(element),
            IOOption.filter(Function.constant(focused)),
            IOOption.map((element) => element.focus()),
            IOOption.execute,
          )
        }}
        className="font-sora h-full w-full grow border-none text-center text-xs text-neutral-600 outline-none placeholder:text-neutral-400"
      />
    </div>
  )
}
