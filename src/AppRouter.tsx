import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
// import CallbackPage from './pages/CallbackPage';
// import NotFoundPage from './pages/NotFoundPage';
import ForbiddenPage from './pages/ForbiddenPage';
import AdminPage from './pages/AdminPage';
// import MyReportsPage from './pages/MyReportsPage';
// import UserReportsPage from './pages/UserReportsPage';

export default function AppRouter() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<HomePage/>} /> 
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/admin/:pageId" element={<AdminPage/>} />
                {/* <Route path="/my-reports" element={<MyReportsPage/>} />
                <Route path="/user-reports" element={<UserReportsPage/>} /> 
                <Route path="/callback/" element={<CallbackPage/>} />*/}
                <Route path="/forbidden" element={<ForbiddenPage/>} /> 
                <Route path="*" element={<NotFoundPage/>} />
            </Routes>
        </Router>
    );
  }