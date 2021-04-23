import React from 'react';
import { map } from "rxjs/operators";
import { useStream } from 'react-mono-state';
import { AppState, Todo } from "../states/appState";
import { Link } from '../components/link';

export const ActiveTodos = () => {

  const [{ data }] = useStream<string, AppState>((_, store) =>
    store.select(state => state.todos).pipe(
      map(todos => todos.reduce((sum: number, todo: Todo) => (sum + (todo.completed ? 0 : 1)), 0)),
      map(nums => `${nums} items left`))
  );
  return (
    <div className="float-left">{data}</div>
  )
}