import { useState, useEffect, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { InputDataFileContext } from "../../context/InputDataFileContext";
import api from "../../services/Interceptors";
import Cookies from "js-cookie";
import Navbar from "../../components/Navbar/Navbar";
import DragDrop from "../../components/DragDropFIle/DragDropFile";
import Loader from "../../components/Loader/Loader";

export default function Client() {
  const [inputFiles, setInputFiles] = useState(false);
  const [inputManual, setInputManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canInput, setCanInput] = useState(false);

  const [textInformation, setTextInformation] = useState("");
  const [phone, setPhone] = useState("");

  const { existFile, selectedFile } = useContext(InputDataFileContext);

  const nameRef = useRef(null);

  const { clientId } = useParams();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    let data;
    if (jsonFile) {
      data = {
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
    } else {
      data = {
        variables: {
          contacts: [{ name: nameRef.current.value, cellphone: phone }], // Envelopa em um Array
          isManual: true,
        },
      };
    }

    try {
      // Usando o seu interceptor do Axios que já coloca o JWT
      const response = await api.post("/graphql/", data, {
        headers: { "X-Client-Id": clientId },
      });
      if (response.data) {
        setTextInformation("Banco atualizado!");
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro no envio:", error);
    }
  }

  async function sendDataManual() {
    console.log("name: ", nameRef.current.value);
    console.log("number: ", phone);

    const IMPORT_MUTATION = `
    mutation ImportContacts($contacts: [ContactInput]!) {
      importContacts(contacts: $contacts) {
        success
        message
      }
    }
  `;

    const payload = {
      query: IMPORT_MUTATION, // A query/mutation SEMPRE deve ir aqui
      variables: {
        contacts: [
          {
            name: nameRef.current.value,
            cellphone: phone, // Aquele número 5541... que validamos
          },
        ],
      },
    };

    try {
      const response = await api.post("/graphql/", payload, {
        headers: { "X-Client-Id": clientId },
      });
      if (response.data) {
        setTextInformation("Banco de dados Atualizado com sucesso!!");
      }
    } catch (error) {
      // DICA SÊNIOR: Olhe o response.data.errors para ver o erro exato do Graphene
      console.error("Erro detalhado:", error.response?.data);
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // REGEX Sênior: Remove tudo o que NÃO for número
    const cleanValue = value.replace(/\D/g, "");

    // Limita o tamanho máximo (Ex: 13 dígitos para 55 + DDD + 9 dígitos)
    if (cleanValue.length <= 13) {
      setPhone(cleanValue);
    }

    if (cleanValue.length == 13) {
      setCanInput(true);
    } else {
      setCanInput(false);
    }
  };

  const handleKeyDown = (e) => {
    // Permite teclas de controle (Backspace, Delete, Tab, setas)
    const allowedKeys = [
      "Backspace",
      "Delete",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
    ];

    // Se não for número e não estiver na lista permitida, bloqueia o evento
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className="overflow-x-hidden overflow-y-hidden">
      <Navbar client={clientId} />
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
                setCanInput(false);
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
            <form className="mt-5">
              <div class="form-group">
                <label for="exampleInputName">Nome</label>
                <input
                  ref={nameRef}
                  type="text"
                  class="form-control"
                  id="exampleInputName"
                  aria-describedby="nameHelp"
                  placeholder="Enter email"
                />
              </div>
              <div class="form-group">
                <label for="exampleInputCellPhone">Número</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputCellPhone"
                  placeholder="Número"
                  onKeyDown={handleKeyDown}
                  onChange={handlePhoneChange}
                />
              </div>
            </form>
          )}
          {canInput && (
            <>
              <button
                className="mt-5 w-25 m-auto btn btn-success"
                onClick={() => {
                  sendDataManual();
                  setTextInformation("Lendo arquivo...");
                }}
              >
                Enviar
              </button>
            </>
          )}
          <div className="d-flex justify-content-center flex-column text-center">
            <span>{textInformation}</span>
          </div>
          {loading && (
            <div className="d-flex justify-content-center flex-column text-center align-items-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
