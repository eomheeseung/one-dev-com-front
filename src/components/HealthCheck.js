import React, { useEffect, useState } from 'react';

const HealthCheck = () => {
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const accessToken = localStorage.getItem('accessToken');
                const refreshToken = localStorage.getItem('refreshToken');

                if (!accessToken || !refreshToken) {
                    throw new Error('토큰이 없습니다.');
                }

                const response = await fetch('http://localhost:8080/api/health-check', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        // 'Refresh-Token': refreshToken, // 필요에 따라 추가 헤더
                    },
                });

                if (!response.ok) {
                    throw new Error(`서버 응답 상태 코드: ${response.status}`);
                }

                setStatus(response.status);
            } catch (err) {
                setError(err.message);
            }
        };

        checkHealth();
    }, []);

    return (
        <div>
            <h1>Health Check</h1>
            {status !== null && (
                <p>서버 응답 상태 코드: {status}</p>
            )}
            {error && (
                <p>에러 발생: {error}</p>
            )}
        </div>
    );
};

export default HealthCheck;
