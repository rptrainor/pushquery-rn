import React from "react";
import { AuthProvider } from "./AuthProvider";
import { TalkProvider } from "./TalkProvider";

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
    <ProviderComposer contexts={[<AuthProvider />, <TalkProvider />]}>
      {children}
    </ProviderComposer>
  );
}

export { ContextProvider };
