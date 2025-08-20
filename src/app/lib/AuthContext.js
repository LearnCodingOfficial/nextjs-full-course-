'use client';
import React, { useEffect, useState } from 'react'
import { createContext, useContext } from 'react';
import { auth, googleProvider } from "./firebase";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
  }
  const register = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
  }
  const loginWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  }
  const logout = () => {
    signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext);
}
