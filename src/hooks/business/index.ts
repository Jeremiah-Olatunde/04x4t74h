import { useEffect, useState } from "react"

import { createHookRemoteData } from "@/utils/hooks"
import { fetchBusinessOne } from "@/api/endpoints/catalog/externalorganisation/[id]/offerings"
import { fetchBusinessAll } from "@/api/endpoints/catalog/externalorganisation/offerings"
import type { Business } from "@/types/business"
import * as RemoteData from "@/lib/remote-data"

export const useBusinessOne = createHookRemoteData(fetchBusinessOne)
export const useBusinessAll = createHookRemoteData(fetchBusinessAll)

type BusinessCacheAll = null | readonly Business[]
type BusinessCacheOne = Readonly<Record<string, Business>>
type BusinessCache = { all: BusinessCacheAll; one: BusinessCacheOne }

let CACHE: BusinessCache = { all: null, one: {} }

function getBusinessOne(cache: BusinessCache, id: string): Business | null {
  return cache.one[id] ?? null
}

function getBusinessAll(cache: BusinessCache): readonly Business[] | null {
  return cache.all ?? null
}

function setBusinessOne(
  cache: BusinessCache,
  business: Business,
): BusinessCache {
  const all = cache.all
  const one = { ...cache.one, [business.id]: business }
  return { all, one }
}

function setBusinessAll(businesses: readonly Business[]): BusinessCache {
  const all = businesses
  const one = Object.fromEntries(all.map((b) => [b.id, b] as const))
  return { all, one }
}

export const useBusinessOneCache = function (id: string) {
  type T = RemoteData.RemoteData<unknown, Business>
  const [remoteData, setRemoteData] = useState<T>(RemoteData.pending)

  useEffect(() => {
    let aborted = false

    const cached = getBusinessOne(CACHE, id)

    if (cached !== null) {
      setRemoteData(RemoteData.success(cached))
      return
    }

    fetchBusinessOne(id)
      .then((value) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.success(value))
        CACHE = setBusinessOne(CACHE, value)

        fetchBusinessAll()
          .then((value) => {
            CACHE = setBusinessAll(value)
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
  }, [id])

  return remoteData
}

export const useBusinessAllCache = function () {
  type T = RemoteData.RemoteData<unknown, readonly Business[]>
  const [remoteData, setRemoteData] = useState<T>(RemoteData.pending)

  useEffect(() => {
    let aborted = false

    const cached = getBusinessAll(CACHE)

    if (cached !== null) {
      setRemoteData(RemoteData.success(cached))
      return
    }

    fetchBusinessAll()
      .then((value) => {
        if (aborted) {
          return
        }

        setRemoteData(RemoteData.success(value))
        CACHE = setBusinessAll(value)
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
  }, [])

  return remoteData
}
