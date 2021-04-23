import React from 'react';
import { SearchCategory } from "../states/appState";
import { Link } from '../components/link';
import { ActiveTodos } from '../components/activeTodos';

export const ToolBar = () => {

  return (
    <div>
      <ActiveTodos />
      <div className="float-right">

        <Link filter={SearchCategory.all}>
          All
        </Link>
        <Link filter={SearchCategory.active}>
          Active
        </Link>
        <Link filter={SearchCategory.completed}>
          Completed
        </Link>

      </div>
      <div className="clear-both" />
    </div>
  )
}