import React, { Component } from 'react';
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter,
 } from "react-router-dom";
 import Main from "./Main";
 import Stuff from "./Stuff";
 import Contact from "./Contact";
 import Bitcoin from "./Bitcoin";
 import Faq from "./Faq";
 import Upload from "./Upload";
 import Comments from './Comments';

class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <h1>Imageboard</h1>
      <ul className="header">
      <li><NavLink to="/">Main page</NavLink></li>
      <li><NavLink to="/upload">New post</NavLink></li>
      <li><NavLink to="/faq">FAQ</NavLink></li>
      <li><NavLink to="/stuff">Stuff</NavLink></li>
      <li><NavLink to="/contact">Contact</NavLink></li>
      <li><NavLink to="/bitcoin">Bitcoin</NavLink></li>
      </ul>
      <hr />
      <div className="content">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/stuff" element={<Stuff />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bitcoin" element={<Bitcoin />} />
          <Route path="/faq" element={<Faq/>} />
          <Route path="/upload" element={<Upload/>} />
          <Route path='/comments/:id' element={<Comments/>} />
        </Routes>
      </div>
    </BrowserRouter>
    );
  }
}
export default App;
