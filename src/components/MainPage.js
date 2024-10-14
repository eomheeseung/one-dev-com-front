import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const MainPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // 또는 sessionStorage 사용

        if (token) {
            fetch('/main', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + token, // 토큰 추가
                },
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('사용자 정보를 가져오는 데 오류가 발생했습니다.');
                    }
                    return response.json();
                })
                .then((data) => {
                    setUserInfo(data);
                })
                .catch((error) => {
                    console.error('Error fetching user info:', error);
                    setError(error.message);
                });
        } else {
            console.error('No token found');
            setError('인증 토큰이 없습니다. 다시 로그인해주세요.');
            window.location.href = '/signIn';
        }
    }, []);

    const handleLogout = () => {
        // 로그아웃 처리 로직을 여기에 추가하세요
        // 예를 들어, fetch('/logout', { method: 'POST' })
        console.log('로그아웃 처리');
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">MyApp</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Profile</a>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* 환영 메시지 */}
            <div className="container welcome-container" style={{ marginTop: '50px', textAlign: 'center' }}>
                {error ? (
                    <div className="alert alert-danger">{error}</div>
                ) : userInfo ? (
                    <div className="welcome-message">
                        <h3>환영합니다, {userInfo.name} 님!</h3>
                        <h3>작업구역은 {userInfo.workArea} 입니다.</h3>
                        <button className="btn btn-primary btn-lg btn-custom" onClick={() => alert('환영합니다!')}>
                            확인
                        </button>
                    </div>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </div>
    );
};

export default MainPage;
