import React from 'react';
import { Provider } from 'react-mono-state'
import { store } from './states/reducers/createStore'
import { TodosContainer } from './containers/todosContainer'

function App() {
  return (
    <Provider store={store}>
      <TodosContainer />
    </Provider>

  );
}

export default App;
