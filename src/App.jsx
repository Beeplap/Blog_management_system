import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Management from './pages/Management';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Block_management_system/login" element={<Login />} />
        <Route path="/Block_management_system/signup" element={<Signup />} />
        <Route path="/Block_management_system" element={<Login />} />
        <Route path="/Block_management_system/management" element={<Management />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;