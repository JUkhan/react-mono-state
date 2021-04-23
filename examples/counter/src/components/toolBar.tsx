import React from 'react';
import { useStore } from "react-mono-state";
import { counterState } from '../states/counter';

export const ToolBar = () => {
  const store = useStore();

  function registerState() {
    store.registerState(counterState);
  }

  function unregisterState() {
    store.unregisterState('counter');
  }
  return (
    <div>
      <button onClick={registerState}>Register State</button>
      <button onClick={unregisterState}>Unregister State</button>

    </div>
  );
};
export default ToolBar;