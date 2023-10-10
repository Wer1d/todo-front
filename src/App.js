import {Routes, Route } from 'react-router-dom';
import './index.css';
import './SignIn';
import SignIn from './SignIn';
import Main from './Main';
function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/main" element={<Main/>} />
    </Routes>
  );
}

export default App;
