import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUP from './pages/SignUP';
import Account from './pages/Account';
import Navbar from './components/Navbar';

function App() {
  const isUserSignedIn = !!localStorage.getItem('token')
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path='/' element = { <Home /> } />
        <Route path='/login' element = { <Login /> } />
        <Route path='/signup' element = { <SignUP /> } />
        {isUserSignedIn && <Route path='/account' element = { <Account /> } />}
      </Routes>
    </div>
  );
}

export default App;
