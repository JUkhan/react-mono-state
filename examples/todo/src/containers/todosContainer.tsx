import React from "react";
import {Loading} from '../components/loading';
import {AddTodo} from '../components/addTodo';
import {Error} from '../components/error';
import { ToolBar } from './toolBar';
import {TodoList} from './todoList';

export const TodosContainer =() => {
  return (
    <div className="bg-white rounded shadow p-6 m-4">
        <Loading />
        <AddTodo />
        <ToolBar/>
        <TodoList />
        <Error />
   </div>
  );
};
