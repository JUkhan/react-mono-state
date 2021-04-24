export enum SearchCategory {
  all = 1,
  active,
  completed,
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
  SPINNING_START: Symbol(),
  SPINNING_END: Symbol(),
  TODOS_ERROR: Symbol(),
  TODOS_UPDATED: Symbol(),
  TODOS_ADDED: Symbol(),
  CHANGE_SEARCH_CATEGORY: Symbol(),
  ADD_TODO: Symbol(),
  UPDATE_TODO: Symbol(),
  REMOVE_TODO: Symbol(),
  SEARCH_INPUT: Symbol(),
  SEARCHING_TODOS: Symbol(),
};
