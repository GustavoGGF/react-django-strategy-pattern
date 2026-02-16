import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Macapa from "../pages/Clients/Macapa/Macapa";
import Varejao from "../pages/Clients/Varejao/Varejao";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/clients/macapa" element={<Macapa />} />
      <Route path="/clients/varejao" element={<Varejao />} />
    </Routes>
  </Router>
);

export default AppRoutes;
