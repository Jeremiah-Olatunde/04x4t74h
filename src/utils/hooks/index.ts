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
    const [remoteData, setRemoteData] =
      useState<RemoteData<RemoteError, RemoteValue>>(pending)

    useEffect(() => {
      let aborted = false

      f(...args)
        .then((value) => {
          if (aborted) {
            return
          }

          setRemoteData(success(value))
        })
        .catch((error) => {
          if (aborted) {
            return
          }

          setRemoteData(failure(error))
        })

      return () => {
        aborted = true
      }
    }, args)

    return remoteData
  }
}
