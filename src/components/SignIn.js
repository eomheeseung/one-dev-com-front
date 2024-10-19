import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('로그인 실패: 사용자 이름이나 비밀번호를 확인하세요.');
                }
            })
            .then(data => {
                localStorage.setItem('accessToken', data.accessToken);
                navigate('/mainView'); // 메인 페이지로 리다이렉트
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    const handleNaverLogin = () => {
        window.location.href = 'http://localhost:8080/api/oauth2/authorization/naver';
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        if (accessToken) {
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/mainView'); // 메인 페이지로 리다이렉트
        }
    }, [navigate]);

    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <h4>Sign In</h4>
                </div>
                <div className="signin-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="id"
                                name="username"
                                placeholder="Enter your ID"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="button-container">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link to="/signUp" className="btn btn-secondary">Sign Up</Link>
                        </div>
                    </form>
                </div>
                <div className="signin-footer">
                    <p>Or sign in with</p>
                    <button onClick={handleNaverLogin} className="oauth-button">
                        <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="Sign in with Naver"
                             className="oauth-logo"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
