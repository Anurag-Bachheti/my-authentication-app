import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import { setupInterceptors } from "./api/interceptors";
import AppRoutes from './routes/AppRoutes'
import SessionExpiredHandler from "./components/SessionExpiredHandler";
import './App.css'

function App() {
  const auth = useContext(AuthContext);

   useEffect(() => {
    setupInterceptors(
      auth.getAuth,
      auth.setAuthToken,
      auth.logout
    );
  }, [auth]);

  return (
    <>
    <SessionExpiredHandler />
      <AppRoutes />
    </>
  )
}

export default App;
