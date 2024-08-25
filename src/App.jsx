import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Pages/Crud/Crud";
import Forgot from "./Pages/Login/Forgot";
import SignIn from "./Pages/Login/SignIn";
import SignUp from "./Pages/Login/SignUp";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="crud" element={<Crud />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
