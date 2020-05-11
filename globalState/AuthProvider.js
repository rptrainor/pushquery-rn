import React, { useEffect, useState, createContext } from "react";
import Firebase from "../config/firebase";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
