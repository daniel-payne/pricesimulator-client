import { useQueryState } from "@keldan-systems/state-mutex"



export default function useMultipulesSelection(defaultSelection?: boolean) {
  const [selection] = useQueryState<boolean>("show-multipules", defaultSelection ?? false)

  return selection
}
