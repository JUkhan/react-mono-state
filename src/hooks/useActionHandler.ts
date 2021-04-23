import React from "react";
import { Observable } from "rxjs";
import { MonoStore } from "../store";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";
import { useStore } from "./useStore";
import { Actions } from "../actions";

interface Response<D> {
  loading: boolean;
  error?: any;
  data?: D;
}

export function useActionHandler<R = any, S = any>(
  stream$: (action$: Actions, store: MonoStore<S>) => Observable<R>
) {
  const store = useStore();
  const res = React.useState<Response<R>>({ loading: true });

  useIsomorphicLayoutEffect(() => {
    const sub = stream$(store.action$, store).subscribe(
      (action) => {
        res[1]({ loading: false, error: null, data: action });
      },
      (error) => {
        res[1]({ loading: false, error, data: res[0].data });
      }
    );
    return () => sub?.unsubscribe();
  }, [store]);

  return res;
}

export const useStream = useActionHandler;
