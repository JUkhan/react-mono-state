import React from 'react';
import './App.css';
import { Provider, createStore } from 'react-mono-state'
import Counter from './components/counter';
import ToolBar from './components/toolBar';
import ViewAppState from './components/viewAppState'
import counterState from './states/counter'

const store = createStore([counterState]);

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <ToolBar />
        <Counter />
        <ViewAppState />
      </div>
    </Provider>
  );
}

export default App;
