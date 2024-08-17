/* eslint-disable react/prop-types */
import  { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { signOut } from "firebase/auth/cordova";
import app from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";


export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();


const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateProfileInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo
    });
  };

  const googleLogin = () => {

    return signInWithPopup(auth, googleProvider);
  };



  const LogIn = (email, password) => {
   
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
  
    return signOut(auth);

  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false); 
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    isLoading,
    registerUser,
    updateProfileInfo,
    googleLogin,
    LogIn,
    logOut,
  };

  if (isLoading) {
    return <div className="container mx-auto mt-20 text-center" ><span className="loading loading-bars loading-lg text-warning"></span></div>;
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
