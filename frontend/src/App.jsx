import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import FeedPage from './pages/FeedPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function App() {
  return (
    <div className="relative min-h-screen bg-mesh from-slate-50 via-white to-indigo-50 text-slate-900">
      <div className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-64 max-w-3xl -translate-y-1/3 rounded-full bg-gradient-to-r from-indigo-400/60 via-pink-300/60 to-sky-300/60 blur-3xl" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-10">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/feed"
            element={
              <ProtectedRoute>
                <FeedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
      <ToastContainer position="top-center" autoClose={2500} closeOnClick newestOnTop />
    </div>
  );
}

export default App;
