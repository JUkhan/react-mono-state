import React from 'react';
import { useSelector, useDispatch } from "react-mono-state";
import { AppState } from '../states/appState';

export const CounterCom = () => {
  const dispatch = useDispatch();

  const state = useSelector((state: AppState) => state.counter);

  return (
    <div className="counter">
      <button onClick={(e) => dispatch("inc")}>+</button>
      <button onClick={(e) => dispatch("asyncInc")}>Async(+)</button>
      <button onClick={(e) => dispatch("dec")}>-</button>
      <b>{state?.loading ? "loading..." : state?.count}</b>
    </div>
  );
};
export default CounterCom;