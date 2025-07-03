import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage } from "./pages/registerPage";

const App = () => {

  return (
    <div>
        <Routes>
          <Route path="/register" element={<RegisterPage/>} />
        </Routes>
    </div>
  );
}

export default App;