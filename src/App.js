import {Routes, Route } from 'react-router-dom';
import './index.css';
import SignOut from './SignOut';
import SignIn from './SignIn';
import Main from './pages/home/Main.js';
import Credit from './credit';


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/main" element={<Main/>} />
      <Route path="/credit" element={<Credit/>} />
      {/* <Route path="/signout" element={<SignOut/>} /> */}
    </Routes>
  );
}

export default App;
