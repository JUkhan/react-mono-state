import React, { useState } from "react";
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useDispatch, useActionHandler, useStoreEffect } from "react-mono-state";
import { ActionTypes } from "../states/appState";
import { Input } from './input';

export const AddTodo = () => {

  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [isSearching, togglleSearching] = useState(false)

  const [{ loading }, toggle] = useActionHandler(action$ => action$.whereType(ActionTypes.TODOS_ADDED));

  function handleSubmit(description: string) {
    setDescription(description)
    if (!isSearching)
      dispatch(ActionTypes.ADD_TODO, { completed: false, description });
  }

  //when added successfully
  if (!loading) {
    setDescription('');
    toggle({ loading: true })
  }

  //dispatch search_input action
  function changeHandler(description: string) {
    if (isSearching)
      dispatch(ActionTypes.SEARCH_INPUT, description);
  }

  // catch searcch_input action and debounce input for 320ms and dispatch searching_todos action that actually 
  // notify useTodos hook to perform search operation.
  useStoreEffect(action$ => action$.whereType(ActionTypes.SEARCH_INPUT).pipe(
    debounceTime(320),
    distinctUntilChanged(),
    map(({ payload }) => ({ type: ActionTypes.SEARCHING_TODOS, payload }))
  ));

  return (
    <div className="mt-4">
      <h1 className="text-grey-darkest">Todo List</h1>
      <div className="flex mt-4">
        <Input
          formCSS="w-full mb-4"
          value={description}
          changeValue={changeHandler}
          handleSubmit={handleSubmit}
          isSearching={isSearching}
        />
        <div onClick={e => {
          togglleSearching(val => !val);
          setDescription('');
          dispatch(ActionTypes.SEARCHING_TODOS, '');
        }}
          className="pin-r pin-t mt-2 mr-4 text-purple-lighter cursor-pointer">🔎</div>

      </div>
    </div>
  );
}

