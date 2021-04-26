import { Observable } from "rxjs";
import { useStore } from "./useStore";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";
import { Actions } from "../actions";
import { Action } from "../action";
import { MonoStore } from "../store";

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
