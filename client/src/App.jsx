import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/Addproject";
import ChartBox from "./components/ChartBox";
import "./styles/dashboard.css";


function App() {

return ( <Router>


  <nav className="navbar">
    <Link to="/">Add Project</Link>
    <Link to="/dashboard">Dashboard</Link>
    <Link to="/charts">Charts</Link>
  </nav>

  <Routes>
    <Route path="/" element={<AddProject />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/charts" element={<ChartBox />} />
  </Routes>

</Router>


);
}

export default App;
