import React from "react";
import LoginPage from "./pages/LoginPage";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="h-screen overflow-hidden flex flex-col font-inter bg-blue text-white">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
