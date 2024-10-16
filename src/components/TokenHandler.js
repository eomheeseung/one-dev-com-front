import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const TokenHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const getCookie = (name) => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        };

        const accessToken = getCookie('accessToken');

        if (!accessToken) {
            console.error('Access token이 없습니다.');
            navigate('/signIn');
            return;
        }

        // Access token을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);

        // 토큰 저장 후 /mainView로 리다이렉트
        navigate('/mainView');

    }, [navigate]);

    return null; // 아무것도 렌더링하지 않음
};

export default TokenHandler;
