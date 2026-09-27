import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase web konfiguratsiyasi maxfiy emas — u baribir brauzerga yuboriladi.
// Himoya Firebase konsolidagi API key cheklovlari va Security Rules orqali bo'ladi.
const firebaseConfig = {
  apiKey: "AIzaSyAn7G7i2BgPFXDRDR8GN58WuiRaJwNgM9w",
  authDomain: "crudlogin-7321f.firebaseapp.com",
  projectId: "crudlogin-7321f",
  storageBucket: "crudlogin-7321f.appspot.com",
  messagingSenderId: "638217505460",
  appId: "1:638217505460:web:840ac0aae97741d334a5e1",
  measurementId: "G-RCKCE2CNXB",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
