import AuthContextProvider from "./context/AuthContext";
import EditContextProvider from "./context/EditContext";
import UserContextProvider from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";
import ToastContainerCom from "./components/UI/ToastContainer";
import { useEffect } from "react";
import axios from "axios";

function App() {
   useEffect(() => {
    axios.get("http://localhost:3000/health")
      .then(() => console.log("Connected ✅"))
      .catch(() => console.log("Not Connected ❌"));
  }, []);
  
  return (
    <EditContextProvider>
      <AuthContextProvider>
        <UserContextProvider>
          <ToastContainerCom/>
          <AppRoutes />
        </UserContextProvider>
      </AuthContextProvider>
    </EditContextProvider>
  )
}

export default App;