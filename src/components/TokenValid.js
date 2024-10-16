const TokenValid = async () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        console.error('Access token이 없습니다.');
        return false; // 토큰이 없는 경우 false 반환
    }

    try {
        const response = await fetch('/api/main', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`, // 헤더에 토큰 추가
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('토큰이 유효하지 않거나 사용자 정보를 가져오는 데 실패했습니다.');
        }

        const data = await response.json();
        console.log('사용자 정보:', data);
        return true; // 토큰이 유효한 경우 true 반환
    } catch (error) {
        console.error('토큰 검증 오류:', error);
        return false; // 오류가 발생하면 false 반환
    }
};

export default TokenValid;
