import React, { createContext } from "react";

export const TalkContext = createContext();

export function TalkProvider(props) {
  return (
    <TalkContext.Provider value={{}}>{props.children}</TalkContext.Provider>
  );
}
