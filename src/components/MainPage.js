import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // React Router v6 사용 시

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // 이미 저장된 토큰 가져오기

        if (!token) {
            console.error('No token found');
            setError('인증 토큰이 없습니다. 다시 로그인해주세요.');
            navigate('/signIn');
            return;
        }

        // /main API 호출 시 쿠키에서 토큰 자동 전송
        fetch('/main', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token, // 쿠키에서 토큰을 가져와서 사용
            },
            credentials: 'include',  // 쿠키 전송을 위한 설정
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('사용자 정보를 가져오는 데 오류가 발생했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                setUserInfo(data); // 사용자 정보 설정
            })
            .catch((error) => {
                console.error('Error fetching user info:', error);
                setError(error.message);
                navigate('/signIn'); // 오류 발생 시 로그인 페이지로 리다이렉트
            });
    }, [navigate]);


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userInfo) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Main Page</h1>
            <p>Welcome, {userInfo.name}!</p>
            <p>Your work area is {userInfo.workArea}.</p>
        </div>
    );
};

export default MainPage;
