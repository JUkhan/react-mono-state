import { useStream } from "react-mono-state";
import { map, startWith } from "rxjs/operators";
import { combineLatest } from "rxjs";
import {
  AppState,
  Todo,
  SearchCategory,
  ActionTypes,
} from "../states/appState";

//useActionHandler and useStream are identical
//they are actually same function but different names
export const useTodos = (): Todo[] => {
  const [{ loading, data }] = useStream<Todo[], AppState>((action$, store) =>
    combineLatest([
      store.select((state) => state.searchCategory),
      store.select((state) => state.todos),
      action$.whereType(ActionTypes.SEARCHING_TODOS).pipe(
        map((action) => action.payload),
        startWith("")
      ),
    ]).pipe(
      map(([search, todos, searchText]) => {
        if (searchText) {
          todos = todos.filter((todo: Todo) =>
            todo.description.toLowerCase().includes(searchText)
          );
        }
        switch (search) {
          case SearchCategory.active:
            return todos.filter((todo: Todo) => !todo.completed);
          case SearchCategory.completed:
            return todos.filter((todo: Todo) => todo.completed);
          default:
            return todos;
        }
      })
    )
  );

  return loading ? [] : (data as any);
};
