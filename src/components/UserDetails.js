import React, { useEffect, useState } from 'react';

const UserDetails = () => {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if (!accessToken || !refreshToken) {
                    throw new Error('토큰이 없습니다.');
                }

                const response = await fetch('http://localhost:8080/api/user/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // 요청 본문의 형식
                        Authorization: `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify({}), // 요청 본문이 필요 없다면 빈 객체로 설정
                });

                if (!response.ok) {
                    throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
                }

                const data = await response.json(); // JSON 형태로 응답 데이터 변환
                setUserDetails(data); // 백엔드에서 받은 유저 정보 설정
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>에러 발생: {error}</p>;
    }

    return (
        <div>
            <h1>사용자 세부 정보</h1>
            {userDetails ? (
                <div>
                    <p>이름: {userDetails.name}</p>
                    <p>이메일: {userDetails.email}</p>
                    <p>휴대폰 번호: {userDetails.mobile}</p>
                    <p>업무 지역: {userDetails.work_area}</p>
                </div>
            ) : (
                <p>사용자 정보를 불러올 수 없습니다.</p>
            )}
        </div>
    );
};

export default UserDetails;
