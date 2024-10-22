import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserDetails from './components/UserDetails';
import HealthCheck from "./components/HealthCheck";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/mainView" /> : <SignIn onLogin={handleLogin} />} />
                <Route path="/signIn" element={<SignIn onLogin={handleLogin} />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/mainView" element={isAuthenticated ? <MainPage onLogout={handleLogout} /> : <Navigate to="/signIn" />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/health-check" element={<HealthCheck />} />
            </Routes>
        </Router>
    );
};

export default App;
