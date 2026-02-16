import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/Interceptors";
import DragDrop from "../../../components/DragDropFIle/DragDropFile";
import Cookies from "js-cookie";

export default function Macapa() {
  const [inputFiles, setInputFiles] = useState(false);
  const [inputManual, setInputManual] = useState(false);

  useEffect(() => {
    requestJWT();
  }, []);

  function requestJWT() {
    api
      .get("get-token/")
      .then(function (response) {
        Cookies.set("csrf", response, { expires: 1, path: "/" });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  function sendData() {
    api
      .post("/graphql/", {
        firstName: "Fred",
        lastName: "Flintstone",
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div className="min-vw-100 min-vh-100 position-relative">
        <div className="position-absolute top-50 start-50 translate-middle w20 d-flex justify-content-center flex-column text-center">
          <div className="d-flex justify-content-evenly w20">
            <button
              className="btn btn-success wh85"
              onClick={() => {
                setInputFiles(true);
                setInputManual(false);
              }}
            >
              Envio Manual
            </button>
            <button
              className="btn btn-success wh85"
              onClick={() => {
                setInputFiles(false);
                setInputManual(true);
              }}
            >
              Envio de Arquivo
            </button>
          </div>
          {inputFiles && (
            <div>
              <DragDrop />
            </div>
          )}
          {inputManual && (
            <div>
              <input type="text" />
              <input type="text" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
