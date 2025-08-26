type RemoteInitial = Readonly<{ tag: "RemoteInitial" }>
type RemotePending = Readonly<{ tag: "RemotePending" }>
type RemoteFailure<RemoteError> = Readonly<{
  tag: "RemoteFailure"
  error: RemoteError
}>
type RemoteSuccess<RemoteValue> = Readonly<{
  tag: "RemoteSuccess"
  value: RemoteValue
}>

export type RemoteData<RemoteError, RemoteValue> =
  | RemoteInitial
  | RemotePending
  | RemoteFailure<RemoteError>
  | RemoteSuccess<RemoteValue>

export const failure = <E = never, A = never>(error: E): RemoteData<E, A> => ({
  tag: "RemoteFailure",
  error,
})

export const success = <E = never, A = never>(value: A): RemoteData<E, A> => ({
  tag: "RemoteSuccess",
  value,
})

export const pending: RemoteData<never, never> = {
  tag: "RemotePending",
}

export const initial: RemoteData<never, never> = {
  tag: "RemoteInitial",
}

export const isFailure = <E>(
  data: RemoteData<E, unknown>,
): data is RemoteFailure<E> => data.tag === "RemoteFailure"

export const isPending = (
  data: RemoteData<unknown, unknown>,
): data is RemotePending => data.tag === "RemotePending"

export const isSuccess = <A>(
  data: RemoteData<unknown, A>,
): data is RemoteSuccess<A> => data.tag === "RemoteSuccess"

export const isInitial = (
  data: RemoteData<unknown, unknown>,
): data is RemoteInitial => data.tag === "RemoteInitial"

export const map = <E, A, B>(
  fa: RemoteData<E, A>,
  f: (a: A) => B,
): RemoteData<E, B> => {
  if (isSuccess(fa)) return success(f(fa.value))
  return fa
}

export const fold =
  <E, A, B>(
    onInitial: () => B,
    onPending: () => B,
    onFailure: (error: E) => B,
    onSuccess: (value: A) => B,
  ) =>
  (ma: RemoteData<E, A>): B => {
    switch (ma.tag) {
      case "RemoteInitial": {
        return onInitial()
      }

      case "RemotePending": {
        return onPending()
      }

      case "RemoteFailure": {
        return onFailure(ma.error)
      }

      case "RemoteSuccess": {
        return onSuccess(ma.value)
      }
    }
  }

export const fold3 = <E, A, R>(
  fa: RemoteData<E, A>,
  f: {
    onNone: () => R
    onFailure: (e: E) => R
    onSuccess: (a: A) => R
  },
) => fold(() => f.onNone(), f.onNone, f.onFailure, f.onSuccess)(fa)
