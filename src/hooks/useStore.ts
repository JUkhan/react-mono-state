import React from "react";
import { MonoStore } from "mono-state";
import { ReactMonoContext } from "../components/context";
import { useMonoContext as useDefaultMonoContext } from "./useMonoContext";

export function createStoreHook(context = ReactMonoContext) {
  const useMonoContext =
    context === ReactMonoContext
      ? useDefaultMonoContext
      : () => React.useContext<MonoStore>(context);
  return function useStore() {
    const store = useMonoContext();
    return store;
  };
}

export const useStore = createStoreHook();
