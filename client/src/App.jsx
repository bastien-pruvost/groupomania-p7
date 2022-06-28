import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Landing from 'pages/Landing';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/home' />} />
        <Route path='/home' element={<div>Homepage</div>} />
        <Route path='/landing' element={<Landing />} />
        <Route path='/register' element={<div>Homepage</div>} />
        <Route path='/login' element={<div>Homepage</div>} />
        <Route path='*' element={<h1>Error</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
