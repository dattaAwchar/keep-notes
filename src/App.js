import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Singup from './components/Singup';
import SearchNotes from './components/SearchNotes';

function App() {
  return (
    <>

      <NoteState>
        <Router>
          <Navbar />
          <Alert message="This is amazing, datta awchar"/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/about' element={<About />} />
              <Route exact path='/search' element={<SearchNotes />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/signup' element={<Singup />} />
            </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  );
}

export default App;
