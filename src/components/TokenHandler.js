import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

        fetch('/main', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
            credentials: 'include',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                console.log('사용자 정보:', data);
                navigate('/mainView'); // 변경된 경로로 네비게이트
            })
            .catch((error) => {
                console.error('사용자 정보 가져오기 오류:', error);
                navigate('/signIn');
            });
    }, [navigate]);

    return null; // 아무것도 렌더링하지 않음
};

export default TokenHandler;
