import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GroupSection from "./pages/GroupSection";
import Assessments from './pages/Assessments';
import ExamGrades from './pages/ExamGrades'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/group-section" element={<GroupSection />} />
                        <Route path="/assessments" element={<Assessments />} />
                        <Route path="/grades" element={<ExamGrades />} />
                    </Route>
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;