import { MonoStore } from "mono-state";
import React from "react";

export const ReactMonoContext = React.createContext<MonoStore>(null as any);

if (process.env.NODE_ENV !== "production") {
  ReactMonoContext.displayName = "ReactMonoState";
}
