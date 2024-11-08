import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from './components/main/main';
import Home from './components/home/home';
import FillIn from './components/fillin/fillIn';
import NavBar from './components/NavBar/nav';
import PrivateRoutes from "./components/PrivateR/PrivateRoute";
import Edits from "./components/PrivateR/Edits/edits";
import ViewAdd from "./components/PrivateR/viewAdd/viewAdd";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        
      <NavBar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/main' element={< Main />} />
          <Route path='/fillin' element={<FillIn />} />
         
           <Route path="/edit"
            element={
            <PrivateRoutes> 
              <Route path="/edit/:id" element={<Edits/>} />
              <Route path="/viewAdd" element={<ViewAdd/>} />
            </PrivateRoutes> 
           } />
          

{/* <Route path='*' element={<Error />} />  */}
        </Routes>

      </Router>
  

    </div>
  );
}

export default App;