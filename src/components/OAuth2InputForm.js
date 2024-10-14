import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OAuth2InputForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // 이곳에 API 호출 로직을 추가할 수 있습니다.
        console.log('이름:', name);
        console.log('권한:', role);

        // 서버에 데이터를 전송하는 예시입니다.
        // fetch('/oauth2InputForm', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ name, role }),
        // });
    };

    return (
        <div className="container">
            <h2 className="text-center">사용자 정보 입력</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                <div className="form-group">
                    <label htmlFor="name">이름:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">권한:</label>
                    <input
                        type="text"
                        id="role"
                        name="role"
                        className="form-control"
                        required
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">입력</button>
            </form>
        </div>
    );
};

export default OAuth2InputForm;
