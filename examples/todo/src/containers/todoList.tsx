import React from "react";
import { useTodos } from '../hooks/useTodos';
import { Todo } from './todo'

export const TodoList = () => {
  const todos = useTodos();

  return (
    <React.Fragment>
      {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </React.Fragment>

  );
};
