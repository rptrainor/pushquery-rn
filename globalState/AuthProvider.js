import React, { useEffect, useState, createContext } from "react";
import Firebase from "../config/firebase";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(setCurrentUser);
    if (currentUser) {
      Firebase.firestore()
        .collection("users")
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          if (doc.data().flag.flagged === true) {
            setIsBlocked(true);
          }
        });
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isBlocked,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
