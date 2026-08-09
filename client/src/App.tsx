import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import SearchDevelopers from "./pages/SearchDevelopers";
import PublicProfile from "./pages/PublicProfile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/developers" element={<SearchDevelopers />} />
        <Route path="/developer/:id" element={<PublicProfile />} />
      </Routes>
    </BrowserRouter>
  );
}