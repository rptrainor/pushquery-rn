import React, { useEffect, useState, createContext } from "react";
import Firebase from "../config/firebase";

export const AuthContext = createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blockedUserList, setBlockedUserList] = useState([]);

  useEffect(() => {
    Firebase.auth().onAuthStateChanged(setCurrentUser);
    const blockedUserListener = Firebase.firestore()
      .collection("users")
      .doc(currentUser.uid)
      .collection("blockedUsers")
      .onSnapshot((querySnapshot) => {
        const blockedUsers = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            // id: doc.id,
            blockedUsersID: "",
            ...firebaseData,
          };
          return data;
        });
        setBlockedUserList(blockedUsers);
      });
  }, []);

  console.log({ blockedUserList });

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        blockedUserList,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
