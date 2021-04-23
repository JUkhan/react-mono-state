import { RegisterState } from "react-mono-state";
import { Todo, ActionTypes } from "../appState";
import { Observable } from "rxjs";
import { addTodo, getTodos, removeTodo, updateTodo } from "../../services/api";

export const todos: RegisterState<Todo[]> = {
  stateName: "todos",
  initialState: [],
  mapActionToState(state, action, emit, _, dispatch) {
   
    switch (action.type) {
      case "registerState(todos)":
        callApi(getTodos(), dispatch, (res: Todo[]) => {
          emit(res);
        });
        break;
        case ActionTypes.ADD_TODO:
          callApi(addTodo(action.payload), dispatch, todo => {
            emit([...state, todo] );
            dispatch(ActionTypes.TODOS_ADDED);
          });
        break;
       case ActionTypes.UPDATE_TODO:
          callApi(updateTodo(action.payload), dispatch, updatedtodo => {
            emit(state.reduce((acc: Todo[], todo) => {
                acc.push(todo.id === updatedtodo.id ? updatedtodo : todo);
                return acc;
              }, []),
            );
            dispatch(ActionTypes.TODOS_UPDATED);
          });
        break;
        case ActionTypes.REMOVE_TODO:
          callApi(removeTodo(action.payload?.id ?? 0), dispatch, id => {
            emit(state.filter((t) => t.id !== id));
          });
        break;
    }
  }
};

function callApi<T>(
  stream: Observable<T>,
  dispatch: (type: string, payload?: string) => void,
  resCallback: (data: T) => void
): void {
  dispatch(ActionTypes.SPINNING_START);
  stream.subscribe(
    res => {
      resCallback(res);
      dispatch(ActionTypes.SPINNING_END);
    },
    errors => dispatch(ActionTypes.TODOS_ERROR, errors.message)
  );
}
