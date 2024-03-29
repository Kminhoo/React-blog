import { ReactNode, createContext, useEffect } from "react";

import { app } from "firebaseAPP";
import { getAuth, User, onAuthStateChanged } from "firebase/auth";

import { useState } from "react";

const AuthContext = createContext({
  user: null as User | null
})

interface AuthProps {
  children : ReactNode
}

export const AuthContextProvider = ({ children }: AuthProps) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const auth = getAuth(app)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(user)
      }
    })
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user: currentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;

