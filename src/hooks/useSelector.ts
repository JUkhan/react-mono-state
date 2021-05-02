import React from "react";
import { useStore } from "./useStore";
import { useIsomorphicLayoutEffect } from "../utils/useIsomorphicLayoutEffect";

export function useSelector<S = any, R = any>(selector: (state: S) => R) {
  const store = useStore();
  const [selectedState, setState] = React.useState(selector(store.getState()));
  useIsomorphicLayoutEffect(() => {
    const sub = store.select(selector).subscribe((newSelectedState: any) => {
      setState(newSelectedState);
    });
    return () => {
      sub?.unsubscribe();
    };
  }, [store]);

  return selectedState;
}
