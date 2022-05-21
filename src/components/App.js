import React, { useState } from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="page__container">
      <Header className="header" />
      <Main />          
      <Footer className="footer" />
    </div>
  )
}

export default App;
