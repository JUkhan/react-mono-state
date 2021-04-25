import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-mono-state';
import { ActionTypes, SearchCategory, AppState } from "../states/appState";

function btnClasses(isActive: boolean) {
  return `mr-2 text-blue-500 hover:text-blue-800 ${isActive ? "active" : ""}`;
}
export const Link: FC<{ filter: SearchCategory }> = ({ filter, children }) => {
  const dispatch = useDispatch();
  const active = useSelector((state: AppState) => state.searchCategory);

  return (
    <button
      className={btnClasses(active === filter)}
      onClick={() => dispatch(ActionTypes.CHANGE_SEARCH_CATEGORY, filter)}
    >
      {children}
    </button>
  )
}