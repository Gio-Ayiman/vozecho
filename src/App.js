import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Listening from './pages/Listening';
import Layout from './pages/Layout';
import About from './pages/About';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='listening/:path' element={<Listening />} />
            <Route path='about' element={<About />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
