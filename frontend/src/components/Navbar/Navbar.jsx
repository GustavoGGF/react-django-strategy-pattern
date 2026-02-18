import "./Navbar.css";
import "../../assets/bootstrap-5.3.8/css/bootstrap.css";
import "../../assets/bootstrap-5.3.8/js/bootstrap.bundle.min.js";
import { Link } from "react-router-dom";

export default function Navbar({ client }) {
  return (
    <nav class="navbar nv_stl fixed-top w-100">
      <div class="container-fluid">
        <Link class="navbar-brand clr" to="/home">
          react-django-strategy-pattern
        </Link>
        {client && <span className="navbar-brand clr">Cliente: {client}</span>}
      </div>
    </nav>
  );
}
