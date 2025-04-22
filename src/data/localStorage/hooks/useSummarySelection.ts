import { useQueryState } from "@keldan-systems/state-mutex"

export default function useSummarySelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-summary", defaultSelection ?? false)

  return selection
}
