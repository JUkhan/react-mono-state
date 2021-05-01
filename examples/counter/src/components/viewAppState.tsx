import React from 'react';
import { useSelector } from "react-mono-state";

export const ViewAppState = () => {

  const state = useSelector(state => state);

  return (
    <div> <pre>{JSON.stringify(state, null, 2)}</pre></div>
  );
};

export default ViewAppState;