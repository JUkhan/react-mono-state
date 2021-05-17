import { Observable } from "rxjs";
import { MonoStore, Actions } from "mono-state";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";
import { useStore } from "./useStore";

export function useNotifier<R = any, S = any>(
  stream$: (action$: Actions, store: MonoStore<S>) => Observable<R>,
  notify: (data: R) => void
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    const sub = stream$(store.action$, store).subscribe((res) => {
      notify(res);
    });
    return () => {
      sub?.unsubscribe();
    };
  }, []);
}
