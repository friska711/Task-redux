
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/home-page/HomePage';
import { LoginPage } from './pages/login-page/LoginPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/home' element = {<HomePage/>}/>
        <Route path = '/login' element = {<LoginPage/>}/>
        <Route path = '/' element = {<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
