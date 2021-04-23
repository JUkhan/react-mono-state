import { useStore } from "./useStore";

export function useDispatch() {
  const store = useStore();
  return store.dispatch;
}
