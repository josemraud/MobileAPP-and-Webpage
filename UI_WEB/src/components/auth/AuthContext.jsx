import { Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import jwt from "jwt-decode";
import { createContext, useCallback, useState } from "react";
import { callAPISinToken } from "../../helper/callAPIRestful";
import { useHistory } from "react-router-dom";
import { UserService } from '../../service/UserService';

export const AuthContext = createContext();

const initialState = {
  checking: true,
  logged: false,
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialState);

  let history = useHistory();
  // INI | Login Callback *********************
  const login = async (correo, password) => {
    const resp = await callAPISinToken(
      "user/session/",
      { correo, password },
      "POST"
    );

    if (resp.code === 200) {
      localStorage.setItem("token", resp["token"]);
      localStorage.setItem('user', correo);
      getUser(correo);
      setAuth({
        checking: false,
        logged: true,
      });
      return resp;
    }

    return resp;
  }; // FIN | Login Callback ******************
  const userservice =new UserService();
  const [User, setUser] = useState([{}]);
  const getUser = (correo) => {
    userservice.getUser(correo).then(({ data }) => {
      
      const user = data.map((user) => {
        return {
          code: user.id_usuario,
          
        };
      });
      setUser(user);
      localStorage.setItem('sesh', (user[0].code));
    });
  };



  // INI | Resgister Callback **************
  const register = (nombre, email, password) => {}; // FIN | Resgister Callback **************

  // INI | Verify Token Callback ***********
  const verifyToken = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuth({
        checking: false,
        logged: true,
      });

      return false;
    }

 
  }, []); // FIN | Verify Token Callback ***********

  // Logout Callback *****************
  const logout = async () => {
    const subUSer = jwt_decode(localStorage.getItem("token"));
    const { sub } = subUSer;

    const resp = await callAPISinToken(
      "user/session/",
      { correo: sub },
      "PUT"
    );

    if (resp.code === 200) {
      localStorage.removeItem("token");
      setAuth({
        checking: false,
        logged: false,
      });

      return resp;
    }

    return resp;
  };
  // Logout Callback *****************

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        register,
        verifyToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};export default AuthContext
