/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from "../firebase/firebase.config";

// Create a context for authentication
export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Register a new user with email and password
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update the user's profile with a display name and photo URL
  const updateProfileInfo = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Sign in with Google
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // Sign in with email and password
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Log out the current user
  const logOut = () => {
    return signOut(auth);
  };

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Provide authentication-related information and functions to the rest of the app
  const authInfo = {
    user,
    isLoading,
    registerUser,
    updateProfileInfo,
    googleLogin,
    logIn,
    logOut,
  };

  // Display a loading spinner while authentication state is being determined
  if (isLoading) {
    return (
      <div className="container mx-auto mt-20 text-center">
        <span className="loading loading-bars loading-lg text-warning"></span>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
