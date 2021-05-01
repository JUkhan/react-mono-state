import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { distinctUntilChanged, map } from "rxjs/operators";

import { Action } from "./action";
import { Actions } from "./actions";

export interface RegisterState<M = any, S = any> {
  stateName: string;
  initialState: M;
  mapActionToState: (
    emit: (state: M | ((state: M) => M)) => M,
    select: () => S,
    dispatch: (actionName: string | symbol | Action, payload?: any) => void
  ) => {
    [key: string]: (state: M, action: Action) => void;
  };
}

export class MonoStore<S = any> {
  public _store: BehaviorSubject<any>;
  private _stateSubscriptions: Map<String, Subscription>;
  public _dispatcher = new BehaviorSubject<Action>({ type: "@INIT" });
  constructor(states: RegisterState[]) {
    this._store = new BehaviorSubject<any>({});
    this._stateSubscriptions = new Map<String, Subscription>();
    states.forEach((s) => {
      this.registerState(s);
    });
  }
  public action$ = new Actions(this._dispatcher);

  registerState<M>({
    stateName,
    initialState,
    mapActionToState,
  }: RegisterState<M>): void {
    if (this._store.value[stateName]) {
      return;
    }

    this._store.next(
      Object.assign({}, this._store.value, { [stateName]: initialState })
    );
    this.dispatch({ type: `registerState(${stateName})` });

    const emitState = (state: any) => {
      if (typeof state === "function") {
        state = state(this._store.value[stateName]) as any;
      }
      if (this._store.value[stateName] !== state) {
        this._store.next(
          Object.assign({}, this._store.value, { [stateName]: state })
        );
      }
      return state;
    };
    const reducer = mapActionToState(
      emitState,
      () => this._store.value,
      this.dispatch
    );
    this._stateSubscriptions.set(
      stateName,
      this._dispatcher.subscribe((action) => {
        if (typeof reducer[action.type] === "function") {
          reducer[action.type](this._store.value[stateName], action);
        }
      })
    );
  }
  unregisterState(stateName: string) {
    if (this._store.value[stateName]) {
      this._stateSubscriptions.get(stateName)?.unsubscribe();
      this._stateSubscriptions.delete(stateName);
      const state: any = this.getState();
      delete state[stateName];
      setTimeout(() => {
        this.dispatch(`unregisterState(${stateName})`);
        this._store.next(Object.assign({}, state));
      }, 0);
    }
  }

  dispatch = (actionName: string | symbol | Action, payload?: any) => {
    if (typeof actionName === "object") {
      this._dispatcher.next(actionName);
      return;
    }
    this._dispatcher.next({ type: actionName, payload });
  };
  getState(): S {
    return this._store.value;
  }
  select<T = any>(mapFn: (state: S) => any): Observable<T> {
    let mapped$;
    if (typeof mapFn === "function") {
      mapped$ = this._store.pipe(map((source: any) => mapFn(source)));
    } else {
      throw new TypeError(
        `Unexpected type '${typeof mapFn}' in select operator,` +
          ` expected 'function'`
      );
    }
    return mapped$.pipe(distinctUntilChanged());
  }
  clear(): void {
    this._stateSubscriptions.forEach((value, key) => {
      value.unsubscribe();
    });
    this._stateSubscriptions.clear();
    this._store.next({});
  }
}
export function createStore(states: RegisterState[]) {
  return new MonoStore(states);
}
