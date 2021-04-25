import React from 'react';
import { useStream } from "react-mono-state";
import { map } from 'rxjs/operators';
import { AppState } from '../states/appState';

export const ViewAppState = () => {

  const [{ data }] = useStream((_, store) =>
    store._store.pipe(
      map((state: AppState) => state)
    ));

  return (
    <div> <pre>{JSON.stringify(data, null, 2)}</pre></div>
  );
};

export default ViewAppState;