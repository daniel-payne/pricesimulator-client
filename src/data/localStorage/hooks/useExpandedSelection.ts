import { useQueryState } from "@keldan-systems/state-mutex"

export default function useExpandedSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-expanded", defaultSelection ?? false)

  return selection
}
