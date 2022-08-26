import './App.css';
import NoteState from './context/notes/NoteState';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';


function App() {
  return (
    <>
  
    <NoteState>
    <BrowserRouter>
    <Navbar/>
    <Alert message="note deleted"/>
    <div className="container">
    <Routes>
      <Route exact path="/" element={<Home/>}> </Route>
      <Route exact path="/About" element={<About/> }></Route>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
    
    </>
  );
}

export default App;
