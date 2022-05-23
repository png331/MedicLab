import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login.component';
import Profile from './components/profile.component';
import NoPage from "./components/NoPage";
import UsersPage from "./components/UsersPage";
import UserExaminations from './components/UserExaminations';

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
          <Route path="users" element={<UsersPage />} />
          <Route path="examinations" element={<UserExaminations />} />
          <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  </div>
);
}


export default App;