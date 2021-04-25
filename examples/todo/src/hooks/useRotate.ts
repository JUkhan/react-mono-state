import { useActionHandler } from "react-mono-state";
import { exhaustMap, repeat, takeUntil, endWith } from "rxjs/operators";

import { merge } from "rxjs";
import { tween } from "../services/rxAnimationService";
import { ActionTypes } from "../states/appState";

export const useRotate = (): number => {
  const [{ loading, data }] = useActionHandler((action$) => {
    const start$ = action$.whereType(ActionTypes.SPINNING_START);
    const end$ = action$.whereType(ActionTypes.SPINNING_END);
    const error$ = action$.whereType(ActionTypes.TODOS_ERROR);
    return start$.pipe(
      exhaustMap(() =>
        tween(0, 365, 500).pipe(
          repeat(),
          takeUntil(merge(end$, error$)),
          endWith(0)
        )
      )
    );
  });

  return loading ? 0 : (data as any);
};
