import React from 'react';
import Header from './components/Header/Header';
import "./App.module.scss";
import Hero from './components/Hero/Hero';
import Content from './components/Content/Content';
import Services from './components/Services/Services';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Services />
      <Content />
    </div>
  );
}

export default App;
