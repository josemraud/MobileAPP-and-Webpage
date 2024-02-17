import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const baseURI = process.env.REACT_APP_URL;

// API Rest Methods out Token
export const callAPISinToken = async (endPoint, data, method = "GET") => {
  // Evalua los segementos
  const url = `${baseURI}/${endPoint}`;

  if (method === "GET") {
    const resp = await fetch(url);

    return await resp.json();
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await resp.json();
  }
};

// API Rest Methos with Token
export const callAPIConToken = async (endPoint, data, method = "GET") => {
  // Evalua los segementos
  const url = `${baseURI}/${endPoint}`;
  const token = localStorage.getItem("token") || "";

  if (method === "GET") {
    const resp = await fetch(url, {
      headers: {
        "api-token": token,
      },
    });
    // Data response
    const respData = await resp.json();

    if (respData.code === 401) {
      logout();
    }

    return respData;
  } else {
    const resp = await fetch(url, {
      method,
      headers: {
        "Content-type": "application/json",
        "api-token": token,
      },
      body: JSON.stringify(data),
    });

    const respData = await resp.json();

    if (respData.code === 401) {
      Swal.fire("Error de sesión", respData.message, "error");
      logout();
    }

    return respData;
  }
};

// Cerrar la sesion del usuario
const logout = async () => {
  const subUSer = jwt_decode(localStorage.getItem("token"));
  const { sub } = subUSer;

  const resp = await callAPISinToken("session/", { correo: sub }, "PUT");

  if (resp.code === 200) {
    localStorage.removeItem("token");

    window.location.href = "/";
  }
};
