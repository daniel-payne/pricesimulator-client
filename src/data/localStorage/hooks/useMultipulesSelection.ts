import { useQueryState } from "@keldan-systems/state-mutex"

import type { Multipules } from "@/display/controllers/MultipulesSelector"

export default function useMultipulesSelection(defaultSelection?: Favorites) {
  const [selection] = useQueryState<Favorites>("favorites", defaultSelection ?? "off")

  return selection
}
