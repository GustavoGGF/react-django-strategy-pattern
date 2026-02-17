import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Macapa from "../pages/Clients/Macapa/Macapa";
import Varejao from "../pages/Clients/Varejao/Varejao";
import { InputDataFileProvider } from "../context/InputDataFileProvider";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/clients/macapa"
        element={
          <InputDataFileProvider>
            <Macapa />
          </InputDataFileProvider>
        }
      />
      <Route
        path="/clients/varejao"
        element={
          <InputDataFileProvider>
            <Varejao />
          </InputDataFileProvider>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
