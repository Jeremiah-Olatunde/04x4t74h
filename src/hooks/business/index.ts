import { createHookRemoteData } from "@/utils/hooks"
import { fetchBusinessOne } from "@/api/endpoints/catalog/externalorganisation/[id]/offerings"
import { fetchBusinessAll } from "@/api/endpoints/catalog/externalorganisation/offerings"

export const useBusinessOne = createHookRemoteData(fetchBusinessOne)
export const useBusinessAll = createHookRemoteData(fetchBusinessAll)
