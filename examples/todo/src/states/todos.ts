import { RegisterState, Action } from "react-mono-state";
import { Todo, ActionTypes } from "./appState";
import { Observable } from "rxjs";
import { addTodo, getTodos, removeTodo, updateTodo } from "../services/api";

export const todos: RegisterState<Todo[]> = {
  stateName: "todos",
  initialState: [],
  mapActionToState(emit, _, dispatch) {
    return {
      ["registerState(todos)"]() {
        callApi(getTodos(), dispatch, (res: Todo[]) => {
          emit(res);
        });
      },
      [ActionTypes.ADD_TODO](state, action) {
        callApi(addTodo(action.payload), dispatch, (todo) => {
          emit([...state, todo]);
          dispatch(ActionTypes.TODOS_ADDED);
        });
      },
      [ActionTypes.UPDATE_TODO](state, action) {
        callApi(updateTodo(action.payload), dispatch, (updatedtodo) => {
          emit(
            state.reduce((acc: Todo[], todo) => {
              acc.push(todo.id === updatedtodo.id ? updatedtodo : todo);
              return acc;
            }, [])
          );
          dispatch(ActionTypes.TODOS_UPDATED);
        });
      },
      [ActionTypes.REMOVE_TODO](state, action) {
        callApi(removeTodo(action.payload?.id ?? 0), dispatch, (id) => {
          emit(state.filter((t) => t.id !== id));
        });
      },
    };
  },
};

function callApi<T>(
  stream: Observable<T>,
  dispatch: (type: string | symbol | Action, payload?: string) => void,
  resCallback: (data: T) => void
): void {
  dispatch(ActionTypes.SPINNING_START);
  stream.subscribe(
    (res) => {
      resCallback(res);
      dispatch(ActionTypes.SPINNING_END);
    },
    (errors) => dispatch(ActionTypes.TODOS_ERROR, errors.message)
  );
}
