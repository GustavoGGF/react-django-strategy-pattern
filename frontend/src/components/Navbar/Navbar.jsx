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
        <div className="d-flex justify-content-end">
          <span className="clr"></span>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon white"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              react-django-strategy-pattern
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-end grow pe-3">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/home">
                  Home
                </Link>
              </li>
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Clientes
                </a>
                <ul class="dropdown-menu">
                  <li>
                    <Link class="dropdown-item" to="/clients/Macapa">
                      Macapá
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/clients/Varejao">
                      Varejão
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
