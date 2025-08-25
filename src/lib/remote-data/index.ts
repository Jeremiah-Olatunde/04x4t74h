type RemoteInitial = { tag: "RemoteInitial" }
type RemotePending = { tag: "RemotePending" }
type RemoteFailure<RemoteError> = { tag: "RemoteFailure"; error: RemoteError }
type RemoteSuccess<RemoteValue> = { tag: "RemoteSuccess"; value: RemoteValue }

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
