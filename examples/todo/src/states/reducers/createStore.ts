import {createStore} from 'react-mono-state';
import {todos} from './todos';
import {visibilittyFilter} from './visibilityFilter';

export const store = createStore([todos, visibilittyFilter]);