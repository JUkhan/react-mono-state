export enum SearchCategory {
  all = 1,
  active,
  completed
}
export interface Todo {
  id: number;
  description: string;
  completed: boolean;
}
export interface AppState {
  todos: Todo[];
  searchCategory: SearchCategory;
}

export const ActionTypes = {
  SPINNING_START: "SPINNING_START",
  SPINNING_END: "SPINNING_END",
  TODOS_ERROR: "TODOS_ERROR",
  TODOS_UPDATED: "TODOS_UPDATED",
  TODOS_ADDED: "TODOS_ADDED",
  CHANGE_SEARCH_CATEGORY: "changeSearchCategory",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  REMOVE_TODO: "REMOVE_TODO",
  SEARCH_INPUT:'SEARCH_INPUT',
  SEARCHING_TODOS:'SEARCHING_TODOS'
};
