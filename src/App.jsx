import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Leaderboard from './components/Leaderboard';
import AddUser from './components/AddUser';
import UsersPage from './components/UsersPage';
import DailyProblems from './components/DailyProblems';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Leaderboard />} />
            <Route path="/add_user" element={<AddUser />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/daily_problems" element={<DailyProblems />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
