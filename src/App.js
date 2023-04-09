import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import laptop from './assets/laptop.png'
import smartphone from './assets/smartphone.jpg'
import headphones from './assets/headphone.jpg'

import './styles/App.css'
import Header from "./components/common/navbar/Header";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header/>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
}

export default App;
