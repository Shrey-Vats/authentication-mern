import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/registerPage";
import { LoginPage } from "./pages/loginPage";

const App = () => {

  return (
    <div>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/login" element={<LoginPage/>} />
        </Routes>
    </div>
  );
}

export default App;