import { useEffect, useState } from "react"

import { failure, pending, success, type RemoteData } from "@/lib/remote-data"

type F<Args extends unknown[], Value> = (...args: Args) => Value

export function createHookRemoteData<
  Args extends unknown[],
  RemoteError,
  RemoteValue,
>(
  f: F<Args, Promise<RemoteValue>>,
): F<Args, RemoteData<RemoteError, RemoteValue>> {
  return function (...args: Args): RemoteData<RemoteError, RemoteValue> {
    const [model, setModel] =
      useState<RemoteData<RemoteError, RemoteValue>>(pending)

    useEffect(() => {
      f(...args)
        .then((data) => setModel(success(data)))
        .catch((error) => setModel(failure(error)))
    }, args)

    return model
  }
}
