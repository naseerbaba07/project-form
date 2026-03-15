import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AddProject from "./pages/Addproject";
import ChartBox from "./components/ChartBox";
import ServerStatus from "./components/ServerStatus";
import WakeServer from "./components/WakeServer";
import "./styles/dashboard.css";


function App() {

return ( 
<>
<WakeServer/>
<Router>


  <nav className="navbar">
    <div className="nav-left">
   <NavLink to="/" end>
    Add Project
  </NavLink>

  <NavLink to="/dashboard">
    Dashboard
  </NavLink>

  <NavLink to="/charts">
    Charts
  </NavLink>
</div>

  <div className="nav-right">
    <ServerStatus />
  </div>
</nav>
  <Routes>
    <Route path="/" element={<AddProject />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/charts" element={<ChartBox />} />
  </Routes>

</Router>

</>
);
}

export default App;
