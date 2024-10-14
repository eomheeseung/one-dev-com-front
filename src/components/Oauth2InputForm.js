import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const OAuth2InputForm = () => {
    const [name, setName] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/Oauth2InputForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, role }),


                // 해당 부분이 있어야 oauth2 인증이 유효함.
                credentials: 'include',
            });

            if (response.ok) {
                alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
                window.location.href = '/signIn'; // 회원가입 후 로그인 페이지로 리다이렉트
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('요청 실패:', error);
            alert('서버에 연결할 수 없습니다.');
        }
    };



    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header text-center">
                    <h2>사용자 정보 입력</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">이름:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <div className="invalid-feedback">이름을 입력하세요.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">권한:</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                className="form-control"
                                required
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            />
                            <div className="invalid-feedback">권한을 입력하세요.</div>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">입력</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default OAuth2InputForm;
