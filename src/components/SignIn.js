import React, {useState} from 'react';
import {Link} from 'react-router-dom'; // Link 컴포넌트 import
import './SignIn.css'; // CSS 파일 추가

const SignIn = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();

            fetch('/api/login', { // /api 경로 추가
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // JWT를 JSON으로 받기
                    } else {
                        throw new Error('로그인 실패: 사용자 이름이나 비밀번호를 확인하세요.');
                    }
                })
                .then(data => {
                    // JWT를 localStorage에 저장
                    localStorage.setItem('accessToken', data.accessToken);
                    // refreshToken도 필요할 경우 여기서 추가적으로 처리

                    window.location.href = '/tokenHandler'; // 로그인 후 tokenHandler로 이동
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert(error.message);
                });
        };

        // Naver 로그인 핸들러
        const handleNaverLogin = () => {
            window.location.href = 'http://localhost:8080/api/oauth2/authorization/naver'; // /api 경로 추가
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
                            <img src="https://static.nid.naver.com/oauth/small_g_in.PNG" alt="Sign in with Naver"
                                 className="oauth-logo"/>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
;

export default SignIn;
