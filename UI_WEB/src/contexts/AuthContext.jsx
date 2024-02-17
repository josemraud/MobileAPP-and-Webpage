/**
 * Contexto de la Seguridad de la APP
 */
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../helper/firebase";

export const AuthContext = createContext();

// Valores de Inicio de Auth
const initialState = {
  checking: true,
  logged: false,
  name: null,
  email: null,
  rol: null,
};

export const AuthProvider = ({ children }) => {
  // States vars
  const [currentUSer, setCurrentUSer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authSend, setAuthSend] = useState(initialState);

  // Register de Usuario
  const signup = (email, password) => {
    setAuthSend({
      name: email,
      checking: false,
      logged: true,
    });
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // Login de Usuario
  const login = (email, password) => {
    const result = auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        setCurrentUSer(userCredential.user.email);
        setAuthSend({
          name: userCredential.user.email,
          checking: false,
          logged: false,
        });
      });
    return result;
  };

  // Logout de Usuario
  const logout = () => {
    setAuthSend({
      checking: false,
      logged: false,
    });
    return auth.signOut();
  };

  // Escuchar cambios de User
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(false);
      setCurrentUSer(user);
    });
    return unsubscribe;
  }, []);

  // Get User Detail
  useEffect(() => {
    // fetchUser();
  }, []);

  const fetchUser = async () => {
    const response = db.collection("user");
    const data = await response.get();
    data.docs.forEach((item) => {
      // setAuthSend([...blogs, item.data()]);
    });
  };

  // Valores del Provider
  const valueProvider = {
    signup,
    login,
    logout,
    currentUSer,
    authSend,
  };

  return (
    <AuthContext.Provider value={valueProvider}>
      {children}
    </AuthContext.Provider>
  );
};
