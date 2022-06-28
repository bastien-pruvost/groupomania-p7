import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from 'pages/Landing';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<h1>Homepage</h1>} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<h1>Signup page</h1>} />
        <Route path='/login' element={<h1>Login page</h1>} />
        <Route path='*' element={<h1>Error page</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
