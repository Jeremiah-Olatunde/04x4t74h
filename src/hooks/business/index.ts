import { createHookRemoteData } from "@/utils/hooks"
import {
  fetchBusinessOne,
  fetchBusinessOneCache,
} from "@/api/endpoints/catalog/externalorganisation/[id]/offerings"
import {
  fetchBusinessAll,
  fetchBusinessAllCache,
} from "@/api/endpoints/catalog/externalorganisation/offerings"
import type { Business } from "@/types/business"
import * as RemoteData from "@/lib/remote-data"
import { useEffect, useState } from "react"

export const useBusinessOne = createHookRemoteData(fetchBusinessOne)
export const useBusinessAll = createHookRemoteData(fetchBusinessAll)

type BusinessCacheAll = null | readonly Business[]
type BusinessCacheOne = Readonly<Record<string, Business>>
type BusinessCache = { all: BusinessCacheAll; one: BusinessCacheOne }

let CACHE: BusinessCache = { all: null, one: {} }

export const useBusinessOneCache = function (id: string) {
  type T = RemoteData.RemoteData<unknown, Business>
  const [remoteData, setRemoteData] = useState<T>(RemoteData.pending)

  useEffect(() => {
    let aborted = false

    fetchBusinessOneCache(id, CACHE)
      .then(([cache, value]) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.success(value))

        fetchBusinessAllCache(cache)
          .then(([cache]) => {
            CACHE = cache
          })
          .catch((_error) => {
            console.warn("Error occured while prefetching all businesses")
          })
      })
      .catch((error) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.failure(error))
      })

    return () => {
      aborted = true
    }
  }, [id, CACHE])

  return remoteData
}

export const useBusinessAllCache = function () {
  type T = RemoteData.RemoteData<unknown, readonly Business[]>
  const [remoteData, setRemoteData] = useState<T>(RemoteData.pending)

  useEffect(() => {
    let aborted = false

    fetchBusinessAllCache(CACHE)
      .then(([cache, value]) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.success(value))
        CACHE = cache
      })
      .catch((error) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.failure(error))
      })

    return () => {
      aborted = true
    }
  }, [CACHE])

  return remoteData
}
