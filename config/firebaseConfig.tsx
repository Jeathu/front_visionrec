// config/firebaseConfig.tsx
import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAuth , getAuth} from "firebase/auth";
import { getReactNativePersistence } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";
import 'react-native-dotenv'; 
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC1eYnMxrcSEsGovSp90W7uAd9SyuRrl4s",
  authDomain: "projects2025-c53bd.firebaseapp.com",
  projectId: "projects2025-c53bd",
  storageBucket: "projects2025-c53bd.firebasestorage.app",
  messagingSenderId: "1015593959095",
  appId: "1:1015593959095:web:4a37e430a0447674ba9732",
  measurementId: "G-9R6KFN5RCP"
};

let app;

if (!getApps().length) {
  console.log("Initializing Firebase app...");
  app = initializeApp(firebaseConfig);
} else {
  console.log("Using existing Firebase app instance...");
  app = getApp();
}

console.log("Initializing Auth...");
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

console.log("Initializing Firestore...");
export const db = getFirestore(app);

console.log("Firebase setup complete.");

export const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User signed in with Google:", result.user);
    return result.user; 
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};


export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Un email de réinitialisation a été envoyé.");
  } catch (error: any) {
    alert(`Erreur lors de l'envoi de l'email: ${error.message}`);
  }
};