import { Observable } from "rxjs";
import { useStore } from "./useStore";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";
import { Actions } from "../actions";
import { Action } from "../action";

export function useStoreEffect(
  stream$: (action$: Actions) => Observable<Action>
) {
  const store = useStore();
  useIsomorphicLayoutEffect(() => {
    const sub = stream$(store.action$).subscribe((action) =>
      store.dispatch(action)
    );
    return () => sub?.unsubscribe();
  }, [store]);
}
