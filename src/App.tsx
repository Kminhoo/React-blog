import { useState } from "react"

import { app } from "firebaseAPP"
import { getAuth } from "firebase/auth"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Router from "./components/Router"

const App = () => {

  const auth = getAuth(app)

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser)

  return (
    <>
      <ToastContainer />
      <Router isAuthenticated={isAuthenticated}/>
    </>
  )
}

export default App
