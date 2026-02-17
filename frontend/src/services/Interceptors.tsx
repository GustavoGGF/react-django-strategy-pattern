import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

// Criando instancia do Axios com configuração base
const api: AxiosInstance = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors para adicionar token de autenticação e tratar erros
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("csrftoken");

    if (token && config.headers) {
      config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Interceptor para tratar respostas com erro de autenticação e direcionamento
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn(
        "Sessão expirada ou não autorizada. Redirecionando para a página de login.",
      );
    }
    return Promise.reject(error);
  },
);

// Intercepter do Axios para adicionar o token de autenticação em cada requisição
export default api;
