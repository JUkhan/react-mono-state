import React from "react";
import { ReactMonoContext } from "../components/context";

export function useMonoContext() {
  const contextValue = React.useContext(ReactMonoContext);

  if (process.env.NODE_ENV !== "production" && !contextValue) {
    throw new Error(
      "could not find react-mono-state context value; please ensure the component is wrapped in a <Provider>"
    );
  }

  return contextValue;
}
