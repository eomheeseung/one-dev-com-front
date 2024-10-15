// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
//
// export default App;
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Oauth2InputForm from './components/Oauth2InputForm';
import TokenHandler from './components/TokenHandler'; // TokenHandler 컴포넌트 가져오기

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken'); // 또는 sessionStorage 사용
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={isAuthenticated ? <MainPage /> : <SignIn />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/mainView" element={isAuthenticated ? <MainPage /> : <SignIn />} />
                <Route path="/Oauth2InputForm" element={<Oauth2InputForm />} />
                <Route path="/tokenHandler" element={<TokenHandler />} /> {/* TokenHandler 라우트 추가 */}
            </Routes>
        </Router>
    );
};

export default App;








