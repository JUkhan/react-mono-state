import React, { FC } from "react";
import { useDispatch } from 'react-mono-state';
import { Todo as TodoModel } from "../states/appState";
import { ActionTypes } from "../states/appState";
import { UpdateTodo } from '../components/updateTodo'

export const Todo: FC<{ todo: TodoModel }> = ({ todo }) => {
  const dispatch = useDispatch();
  return (
    <div className="flex bg-white border p-2 justify-between">
      <UpdateTodo {...todo} />
      <button
        className="text-red-200 hover:text-red-600"
        onClick={() => dispatch(ActionTypes.REMOVE_TODO, todo)}>
        Remove
        </button>
    </div>
  );
};
