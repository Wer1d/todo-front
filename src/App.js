import {Routes, Route } from 'react-router-dom';
import './index.css';
import SignOut from './SignOut';
import SignIn from './SignIn';
import Main from './Main';
import ResetPassword from './resetPassword';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn/>} />
      <Route path="/signin" element={<SignIn/>} />
      <Route path="/main" element={<Main/>} />
      <Route path="/signout" element={<SignOut/>} /> 
      <Route path='/resetpassword' element={<ResetPassword/>} />
    </Routes>
  );
}

export default App;
