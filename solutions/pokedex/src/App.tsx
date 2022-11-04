import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.scss';
// import './App.css';
import { Home, PokemonDetailPage } from './pages';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/:name' element={<PokemonDetailPage/>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
