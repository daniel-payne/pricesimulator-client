import { useQueryState } from "@keldan-systems/state-mutex"



export default function useDescriptionsSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-descriptions", defaultSelection ?? false)

  return selection
}
