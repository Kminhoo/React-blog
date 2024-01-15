import { useState, useEffect, useContext } from "react"

import { app } from "firebaseAPP"
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import Router from "components/Router"
import Loader from "components/Loader";

import ThemeContext from "context/ThemeContext";

const App = () => {
  const themeContext = useContext(ThemeContext);

  const auth = getAuth(app);

  const [init, setInit] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setInit(true)
    })
  }, [auth]);

  return (
    <div className={themeContext.theme === 'light' ? 'white' : 'dark'}>
      <ToastContainer />
      { init ? <Router isAuthenticated={isAuthenticated}/> : <Loader /> }
    </div>
  )
}

export default App
