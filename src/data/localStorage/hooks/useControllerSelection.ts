import { useQueryState } from "@keldan-systems/state-mutex"



export default function useControllerSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-controller", defaultSelection ?? false)

  return selection
}
