import React, { useState } from 'react';
import './SignUp.css'; // CSS 파일 import

const SignUp = () => {
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        name: '',
        role: '',
        contact: ''
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                if (response.ok) {
                    window.location.href = '/signIn';
                } else {
                    return response.json().then(data => {
                        setErrorMessage(data.errorMessage || '회원가입에 실패했습니다.');
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                setErrorMessage('회원가입 요청 처리 중 오류가 발생했습니다.');
            });
    };

    return (
        <div className="container">
            <h2>회원가입</h2>

            {/* 에러 메시지 표시 */}
            {errorMessage && (
                <div className="alert" role="alert">
                    <span>{errorMessage}</span>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="id">아이디:</label>
                    <input
                        type="text"
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">이름:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">권한:</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contact">연락처:</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary">회원가입</button>
            </form>

            <div>
                <a href="/signIn" className="btn-secondary">뒤로가기</a>
            </div>
        </div>
    );
};

export default SignUp;
