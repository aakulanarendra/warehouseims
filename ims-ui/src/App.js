import React from 'react';
import './App.css';
import './icon.css'
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./components/shared/layout";
import {ToastContainer} from "react-toastify";

function App() {
  return (
      <BrowserRouter>
        <div>
          <Layout/>
        </div>
          <ToastContainer className="toaster" autoClose={4000}/>
      </BrowserRouter>

  );
}

export default App;
