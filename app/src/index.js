import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContext } from "./components/Store/AuthContext";
import { BrowserRouter } from "react-router-dom";
import sw from './ServiceWorker';
import { ToastContainer } from "react-toastify";
import { ApiContext } from "./components/Store/ApiContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContext>
        <App />
        <ToastContainer />
      </AuthContext>
    </BrowserRouter>
  </React.StrictMode>
);

sw()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
