import React, { FC, useState, useRef } from "react";
import { useDispatch, useActionHandler, useNotifier } from 'react-mono-state';
import { Todo } from "../states/appState";
import { ActionTypes } from "../states/appState";
import { Input } from './input';

export const UpdateTodo: FC<Todo> = ({ completed, description, id }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [value, setDescription] = useState(description);

  useNotifier(action$ => action$.whereType(ActionTypes.TODOS_UPDATED), () => {
    setEditable(false);
  });

  function handleSubmit(description: string) {
    dispatch(ActionTypes.UPDATE_TODO, { id, completed, description });
  }

  function doubleClickHandler() {
    setEditable(true);

  }

  return (
    <div>
      <input
        className="align-middle mr-1"
        type="checkbox"
        defaultChecked={completed}
        onChange={(e) => dispatch(ActionTypes.UPDATE_TODO, { id, description, completed: e.target.checked })}
      />

      {editable ?
        <Input
          formCSS="inline-block"
          inputCSS="ml-1 pl-2 border"
          value={value}
          changeValue={setDescription}
          onBlur={() => setEditable(false)}
          handleSubmit={handleSubmit} />
        :
        <span
          style={{ cursor: 'pointer' }}
          onDoubleClick={doubleClickHandler}
        >
          {description}
        </span>}
    </div>
  );
};