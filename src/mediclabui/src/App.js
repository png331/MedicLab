import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login.component';
import Profile from './components/profile.component';
import Layout from './components/Layout'
import NoPage from "./components/NoPage";


function App() {
  const token = sessionStorage.getItem('accessToken');

  if(!token) {
    return <Login />
  }

  return (
    <div className="wrapper">
    <BrowserRouter>
      <Routes>
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
}


export default App;