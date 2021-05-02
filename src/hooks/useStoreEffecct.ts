import { Observable } from "rxjs";
import { useStore } from "./useStore";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";
import { Actions, Action, MonoStore } from "mono-state";

export function useStoreEffect<S = any>(
  stream$: (action$: Actions, store: MonoStore<S>) => Observable<Action>
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    const sub = stream$(store.action$, store).subscribe((action) =>
      store.dispatch(action)
    );
    return () => sub?.unsubscribe();
  }, [store]);
}
