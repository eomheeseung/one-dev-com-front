import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenValid from './TokenValid'; // tokenValid 함수 임포트

const MainPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkToken = async () => {
            const isValid = await tokenValid();
            if (!isValid) {
                navigate('/signIn'); // 토큰이 유효하지 않으면 로그인 페이지로 리다이렉트
            }
        };

        checkToken();
    }, [navigate]);

    return (
        <div>
            <h1>Main Page</h1>
            {/* 여기에 메인 페이지의 콘텐츠를 추가 */}
        </div>
    );
};

export default MainPage;
