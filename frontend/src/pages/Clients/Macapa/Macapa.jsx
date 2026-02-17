import { useEffect, useState, useContext } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import api from "../../../services/Interceptors";
import DragDrop from "../../../components/DragDropFIle/DragDropFile";
import Cookies from "js-cookie";
import { InputDataFileContext } from "../../../context/InputDataFileContext";
import Loader from "../../../components/Loader/Loader";

export default function Macapa() {
  const [inputFiles, setInputFiles] = useState(false);
  const [inputManual, setInputManual] = useState(false);
  const [loading, setLoading] = useState(false);

  const [textInformation, setTextInformation] = useState("");

  const { existFile, selectedFile } = useContext(InputDataFileContext);

  useEffect(() => {
    requestJWT();
  }, []);

  useEffect(() => {
    if (existFile) {
      setTextInformation("Lendo arquivo...");
      setLoading(true);
    }
  }, [existFile]);

  useEffect(() => {
    if (!selectedFile) return;

    console.log("Validando arquivo:", selectedFile.name);

    // Exemplo de validação sênior: verificar extensão e tamanho (ex: 5MB)
    if (selectedFile.type !== "application/json") {
      console.error("Por favor, envie apenas arquivos JSON.");
      return;
    }

    ReadFile();
  }, [selectedFile]);

  async function ReadFile() {
    if (!selectedFile) return;

    try {
      const text = await selectedFile.text();

      const jsonData = JSON.parse(text);

      if (!jsonData.contacts || !Array.isArray(jsonData.contacts)) {
        throw new Error(
          "Formato JSON inválido: Chave 'contacts' não encontrada.",
        );
      }

      setTextInformation("Enviando Arquivo...");
      return sendData(jsonData.contacts);
    } catch (err) {
      console.error("Erro no processamento:", err);
      return null;
    }
  }

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

  async function sendData(jsonFile) {
    const data = {
      query: `
          mutation ImportContacts($input: [ContactInput!]!) {
            importContacts(contacts: $input) {
              success
              message
            }
          }
        `,
      variables: {
        input: jsonFile,
      },
    };

    try {
      // Usando o seu interceptor do Axios que já coloca o JWT
      const response = await api.post("/graphql/", data, {
        headers: { "X-Client-Id": "macapa" },
      });
      console.log("Resposta do Servidor:", response.data);
    } catch (error) {
      console.error("Erro no envio:", error);
    }
  }

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Navbar />
      <div className="min-vw-100 min-vh-100 position-relative">
        <div className="position-absolute top-50 start-50 translate-middle w30 d-flex justify-content-center flex-column text-center">
          <div className="d-flex justify-content-evenly w30">
            <button
              className="btn btn-success wh85"
              onClick={() => {
                setInputFiles(false);
                setInputManual(true);
              }}
            >
              Envio Manual
            </button>
            <button
              className="btn btn-success wh85"
              onClick={() => {
                setInputFiles(true);
                setInputManual(false);
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
          {loading && (
            <div className="d-flex justify-content-center flex-column text-center">
              <span>{textInformation}</span>
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
