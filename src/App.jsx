import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider from "./firebase/AuthProvider";
import { ProtectedRoute, PublicRoute } from "./components/Routes";
import Crud from "./Pages/Crud/Crud";
import Forgot from "./Pages/Login/Forgot";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot" element={<Forgot />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="crud" element={<Crud />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={1500} transition={Bounce} />
    </AuthProvider>
  );
};

export default App;
