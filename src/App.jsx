/* eslint-disable */
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/Navbar';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DevicePage from './pages/DevicePage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App font-body font-normal leading-normal text-gray-800 text-sm md:font-base md:leading-relaxed">
      <BrowserRouter>
        <AuthProvider>
          <header className=''>
            <NavBar />
          </header>
          <div className="container px-10">
            <Routes>
              <Route element={<HomePage/>} path="/" exact/>
              <Route element={<PrivateRoutes />}>
                <Route element={<DashboardPage/>} path="/dashboard" />
                <Route element={<DevicePage/>} path="/devices" />
                <Route element={<SettingsPage/>} path="/settings" />
              </Route>
              <Route element={<LoginPage />} path="/login" />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
