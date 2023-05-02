import React from 'react';
import {HashRouter, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ImageGenerationForm from './components/Generator';

const App = () => {
  return (
    <div>
      <HashRouter>
      <Navbar/>
      <div className="container">
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/generate" element={<ImageGenerationForm/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
      </div>
      </HashRouter>
    </div>
  );
}

export default App;