import { RegisterState } from "react-mono-state";
import { Counter } from "./appState";

export const counterState: RegisterState<Counter> = {
  stateName: "counter",
  initialState: { loading: false, count: 0 },
  async mapActionToState(state, action, emit) {
    switch (action.type) {
      case "inc":
        emit({ loading: false, count: state.count + 1 });
        break;
      case "dec":
        emit({ loading: false, count: state.count - 1 });
        break;
      case "asyncInc":
        emit({ loading: true, count: state.count });
        await delay(1000);
        emit((c_state) => ({ loading: false, count: c_state.count + 1 }));
        break;
    }
  },
};

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default counterState;
