import { createHookRemoteData } from "@/utils/hooks"
import { offerings } from "@/api/endpoints/catalog/externalorganisation/[id]/offerings"
import { externalorganisation } from "@/api/endpoints/catalog/externalorganisation"

export const useBusinesses = createHookRemoteData(externalorganisation)
export const useBusinessesWithReviewsAndServices =
  createHookRemoteData(offerings)
