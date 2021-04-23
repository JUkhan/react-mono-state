# react-mono-state

State Management Lib - This is reactive and less boilerplate

[counter](https://stackblitz.com/edit/react-mono-state?file=index.tsx) | [todo](https://stackblitz.com/edit/react-todo-mono?file=index.tsx)

### counterState

```tsx
import { RegisterState } from "react-mono-state";

export const counterState: RegisterState<CounterState> = {
  stateName: "counter",
  initialState: { loading: false, count: 0 },
  async mapActionToState(state, action, emit) {
    switch (action.type) {
      case "inc":
        emit({ loading: false, count: state.count + 1 });
        break;
      case "dec":
        emit({ loading: false, count: state.count - 1 });
        break;
      case "asyncInc":
        emit({ loading: true, count: state.count });
        await delay(1000);
        emit((cstate) => ({ loading: false, count: cstate.count + 1 }));
        break;
    }
  },
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

### counterComponent

```tsx
import { useSelector, useDispatch } from "react-mono-state";

export default () => {
  const dispatch = useDispatch();
  const { count, loading } = useSelector<AppState, CounterState>(
    (state) => state.counter
  );
  return (
    <div>
      <button onClick={(e) => dispatch("inc")}>+</button>
      <button onClick={(e) => dispatch("asyncInc")}>Async(+)</button>
      <button onClick={(e) => dispatch("dec")}>-</button>
      <span>{loading ? "loading..." : count}</span>
    </div>
  );
};
```

### app.ts

```tsx
import React from "react";
import { Provider, createStore } from "react-mono-state";
import { counterState } from "../states/counterState";

import "../styles/globals.css";

export const store = createStore([counterState]);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
```
