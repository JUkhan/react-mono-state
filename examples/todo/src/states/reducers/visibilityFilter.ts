import {RegisterState} from 'react-mono-state';
import {SearchCategory, ActionTypes} from '../appState';

export const visibilittyFilter:RegisterState<SearchCategory>={
  stateName:'searchCategory',
  initialState:SearchCategory.all,
  mapActionToState(_, action, emit){
      if(action.type===ActionTypes.CHANGE_SEARCH_CATEGORY)
        emit(action.payload)
  }
}