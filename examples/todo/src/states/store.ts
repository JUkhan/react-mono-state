import { createStore } from "mono-state";
import { todos } from "./todos";
import { visibilittyFilter } from "./visibilityFilter";

export const store = createStore([todos, visibilittyFilter]);
