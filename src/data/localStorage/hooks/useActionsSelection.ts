import { useQueryState } from "@keldan-systems/state-mutex"

export default function useActionsSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-action", defaultSelection ?? false)

  return selection
}
