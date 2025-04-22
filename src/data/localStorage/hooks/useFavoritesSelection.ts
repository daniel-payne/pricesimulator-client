import { useQueryState } from "@keldan-systems/state-mutex"

export default function useFavoritesSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-favorites", defaultSelection ?? false)

  return selection
}
