import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Navbar from "./components/Navbar";
import Hotels from "./pages/Hotels";
import Rooms from "./pages/Rooms";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  const location = useLocation();
  const hideNavbarOnLogin = location.pathname === "/login" || location.pathname === "/register";
  return (
    <div className="">
      {!hideNavbarOnLogin && <Navbar />}
     <div className="">
      <Routes>
        <Route path="/" element={<Home />} />     
        <Route path="/explore" element={<Explore />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/find/:id" element={<Rooms />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
     </div>
    </div>
  );
};

export default App;
