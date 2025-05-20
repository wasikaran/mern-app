import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <NoteState>
    <Router>
      <Navbar />

      <div className="container">
        {/* <Alert message={"this is Alert So attention please"} /> */}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>

      </div>
      
    </Router>
    </NoteState>
  );
}

export default App;
