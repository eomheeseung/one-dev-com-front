import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link 컴포넌트 import
import './SignIn.css'; // CSS 파일 추가

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 요청 처리 로직 추가
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then(response => {
                if (response.ok) {
                    // 로그인 성공 시 처리 (예: 리다이렉션)
                    window.location.href = '/main'; // 로그인 후 메인 페이지로 이동
                } else {
                    throw new Error('로그인 실패: 사용자 이름이나 비밀번호를 확인하세요.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(error.message);
            });
    };

    // Naver 로그인 핸들러
    const handleNaverLogin = () => {
        window.location.href = 'oauth2/authorization/naver'; // 절대 경로 사용
    };


    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <h4>Sign In</h4>
                </div>
                <div className="signin-body">
                    <form onSubmit={handleSubmit}>
                        {/* ID Input */}
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
                        {/* Password Input */}
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
                        {/* Sign In and Sign Up Buttons */}
                        <div className="button-container">
                            <button type="submit" className="btn btn-primary">Login</button>
                            <Link to="/signUp" className="btn btn-secondary">Sign Up</Link> {/* Link로 변경 */}
                        </div>
                    </form>
                </div>
                <div className="signin-footer">
                    <p>Or sign in with</p>
                    <button onClick={handleNaverLogin} className="oauth-button">
                        <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="Sign in with Naver" className="oauth-logo" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
