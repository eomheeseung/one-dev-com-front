import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // localStorage에서 accessToken 가져오기
        const token = localStorage.getItem('accessToken'); // localStorage에서 accessToken 가져오기

        if (token) {
            setIsAuthenticated(true); // 토큰이 있으면 인증 상태를 true로 설정
        }
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true); // 로그인 성공 시 인증 상태 업데이트
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // 로그아웃 시 accessToken 삭제
        setIsAuthenticated(false); // 인증 상태 업데이트
    };

    return (
        <Router>
            <Routes>
                <Route path="/"
                       element={isAuthenticated ? <Navigate to="/mainView"/> : <SignIn onLogin={handleLogin}/>}/>
                <Route path="/signIn" element={<SignIn onLogin={handleLogin}/>}/>
                <Route path="/signUp" element={<SignUp/>}/>
                <Route path="/mainView"
                       element={isAuthenticated ? <MainPage onLogout={handleLogout}/> : <Navigate to="/signIn"/>}/>
            </Routes>
        </Router>
    );
};

export default App;
