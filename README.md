# react-mono-state

State Management Lib - reactive and less boilerplate. No need external middleware to perform state change asynchronously and you can handle any action on any component and also make effects on it by using hooks - useActionHandler, useStoreEffect. Remaining useful hooks are - useSelector, useDispatch, useStore etc.

[counter](https://stackblitz.com/edit/react-mono-state?file=index.tsx) | [todo](https://stackblitz.com/edit/react-todo-mono?file=index.tsx)

### counterState

```tsx
import { RegisterState } from "react-mono-state";

export const counterState: RegisterState<Counter> = {
  stateName: "counter",
  initialState: { loading: false, count: 0 },
  mapActionToState(emit) {
    return {
      inc(state) {
        emit({ loading: false, count: state.count + 1 });
      },
      dec(state) {
        emit({ loading: false, count: state.count - 1 });
      },
      async asyncInc(state) {
        emit({ loading: true, count: state.count });
        await delay(1000);
        emit((c_state) => ({ loading: false, count: c_state.count + 1 }));
      },
    };
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
  const { count, loading } = useSelector((state: AppState) => state.counter);
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
