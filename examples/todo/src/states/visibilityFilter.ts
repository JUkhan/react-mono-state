import { RegisterState } from "mono-state";
import { SearchCategory, ActionTypes } from "./appState";

export const visibilittyFilter: RegisterState<SearchCategory> = {
  stateName: "searchCategory",
  initialState: SearchCategory.all,
  mapActionToState(emit) {
    return {
      [ActionTypes.CHANGE_SEARCH_CATEGORY](_, action) {
        emit(action.payload);
      },
    };
  },
};
