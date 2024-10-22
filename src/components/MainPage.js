import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
            navigate('/signIn'); // 토큰이 없으면 로그인 페이지로 리다이렉션
            return;
        }

        fetch('/api/userInfo', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
                }
            })
            .then(data => {
                setUserInfo(data);
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
                navigate('/signIn'); // 에러 발생 시 로그인 페이지로 리다이렉션
            });
    }, [navigate]);

    const goToUserDetails = () => {
        navigate('/user-details');
    };

    const goToHealthCheck = () => {
        navigate('/health-check');
    };

    return (
        <div>
            <h1>Main Page</h1>
            {userInfo ? (
                <div>
                    <p>이메일: {userInfo.email}</p>
                    <p>이름: {userInfo.name}</p>
                    <p>휴대폰 번호: {userInfo.mobile}</p>
                    <p>업무 지역: {userInfo.work_area}</p>

                    <button onClick={goToUserDetails}>
                        사용자 세부 정보 보기
                    </button>

                    <button onClick={goToHealthCheck}>
                        헬스 체크 보기
                    </button>
                </div>
            ) : (
                <p>사용자 정보를 로딩 중...</p>
            )}
        </div>
    );
};

export default MainPage;
