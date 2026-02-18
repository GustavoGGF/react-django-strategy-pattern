import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import { InputDataFileProvider } from "../context/InputDataFileProvider";
import Client from "../pages/Client/Client";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route
        path="/clients/:clientId"
        element={
          <InputDataFileProvider>
            <Client />
          </InputDataFileProvider>
        }
      />
    </Routes>
  </Router>
);

export default AppRoutes;
