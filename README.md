# react-mono-state

State Management Lib - reactive and less boilerplate. No need external middleware to perform state change asynchronously and you can handle any actions on any components and also make effects on it by using hooks - useActionHandler, useStoreEffect. Remaining useful hooks are - useSelector, useDispatch, useStore etc.

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

### Action Handler and Effects [search Demo](https://stackblitz.com/edit/react-mono-search?file=Search.tsx)

We are going to develop a search component. This component has a `SearchInput` child component who dispatches `search-input` action every times user strokes in the keyboard. The `search-input` action catched by the `useStoreEffect` hook who debounces a while so that he can collect some keys and then send a request to the server to pull the search result and finally dispatch a new action named `search-result`.

At the moment `search-result` action has been dispatched - `Search` component is ready to handle this action by the `useActionHandler` hook and finally rendering the search result.

Reactive programming is COOL - What a nice combination. its really useful and effective. isn't it?

### `SearchInput` component

```ts
import React from "react";
import { useStoreEffect, useDispatch } from "react-mono-state";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  filter,
} from "rxjs/operators";
import { from } from "rxjs";

export default () => {
  const dispatch = useDispatch();

  useStoreEffect((action$) =>
    action$.whereType("search-input").pipe(
      debounceTime(320),
      distinctUntilChanged(),
      filter(({ payload }) => !!payload),
      switchMap((action) => getData(action.payload)),
      map((res) => ({ type: "search-result", payload: res }))
    )
  );

  return (
    <div>
      <input
        onChange={(e) =>
          dispatch({ type: "search-input", payload: e.target.value })
        }
        placeholder="search wiki..."
      />
    </div>
  );
};

function getData(text) {
  return from(
    fetch(
      `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${text}&limit=5`
    )
      .then((d) => d.json())
      .then((d) => d)
  );
}
```

### `Search` component

```ts
import React from "react";
import SearchInput from "./SearchInput";
import { useActionHandler } from "react-mono-state";
import { map } from "rxjs/operators";

export default () => {
  const [{ loading, data }] = useActionHandler((action$) =>
    action$.whereType("search-result").pipe(map((action) => action.payload))
  );

  const res = loading ? (
    <div>No search result</div>
  ) : (
    data[1].map((text, index) => <div key={index}>{text}</div>)
  );

  return (
    <div>
      <SearchInput />
      {res}
    </div>
  );
};
```
