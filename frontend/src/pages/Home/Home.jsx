import "../../assets/bootstrap-5.3.8/css/bootstrap.css";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="min-vw-100 min-vh-100 position-relative">
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="d-flex flex-column w20 justify-content-center text-center">
            <h3>Clientes</h3>
            <div className="d-flex justify-content-evenly mt-5">
              <div>
                <Link
                  to="/clients/macapa"
                  aria-current="page"
                  className="btn btn-primary"
                >
                  Macapá
                </Link>
              </div>
              <div>
                <Link
                  to="/clients/varejao"
                  aria-current="page"
                  className="btn btn-primary"
                >
                  Varejão
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
