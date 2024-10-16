import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Oauth2InputForm from './components/Oauth2InputForm';
import TokenHandler from './components/TokenHandler'; // TokenHandler 컴포넌트 가져오기

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // 쿠키에서 accessToken 가져오는 함수
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        // 쿠키에서 accessToken 확인
        const token = getCookie('accessToken'); // 쿠키에서 accessToken 가져오기

        if (token) {
            setIsAuthenticated(true); // 토큰이 있으면 인증 상태를 true로 설정
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <MainPage /> : <SignIn />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/mainView" element={isAuthenticated ? <MainPage /> : <SignIn />} />
                <Route path="/Oauth2InputForm" element={<Oauth2InputForm />} />
                <Route path="/tokenHandler" element={<TokenHandler />} /> {/* TokenHandler 라우트 추가 */}
            </Routes>
        </Router>
    );
};

export default App;
