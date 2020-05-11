import React from "react";
import { AuthProvider } from "./AuthProvider";

function ProviderComposer({ contexts, children }) {
  return contexts.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
}

function ContextProvider({ children }) {
  return (
    <ProviderComposer contexts={[<AuthProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
