import './App.css';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Home from './components/Home';
import Nav from './components/nav/Nav';
import Footer from './components/footer/Footer';
import Register from './components/footer/register/Register';
import Login from './components/footer/register/Login';
import UserPage from './components/UserPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/user-area" element={<UserPage />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
