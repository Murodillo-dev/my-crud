import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Saqlangan temani sahifa chizilishidan oldin qo'llash
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) document.documentElement.dataset.theme = savedTheme;
} catch {
  // localStorage mavjud bo'lmasa, standart tema qoladi
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
