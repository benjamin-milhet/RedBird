import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import './index.css';

import reportWebVitals from './reportWebVitals';
import { Connexion } from './pages/connexion';
import { Inscription } from './pages/inscription';
import { Accueil } from './pages/accueil';
import App  from './pages/App';
import {User } from './pages/user';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={< App/>} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/inscription" element={<Inscription />} />
      <Route path="/user/jean" element={<User />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
