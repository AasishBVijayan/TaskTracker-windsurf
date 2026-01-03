import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import TaskFlowLayout from './components/TaskFlowLayout';
import Login from './components/Login';
import Register from './components/Register';
import TaskFlowDashboard from './components/TaskFlowDashboard';
import MyTasks from './components/MyTasks';
import Completed from './components/Completed';
import Calendar from './components/Calendar';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={
                <PublicRoute>
                  <TaskFlowLayout>
                    <Login />
                  </TaskFlowLayout>
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <TaskFlowLayout>
                    <Register />
                  </TaskFlowLayout>
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <TaskFlowLayout>
                    <TaskFlowDashboard />
                  </TaskFlowLayout>
                </ProtectedRoute>
              } />
              <Route path="/my-tasks" element={
                <ProtectedRoute>
                  <TaskFlowLayout>
                    <MyTasks />
                  </TaskFlowLayout>
                </ProtectedRoute>
              } />
              <Route path="/completed" element={
                <ProtectedRoute>
                  <TaskFlowLayout>
                    <Completed />
                  </TaskFlowLayout>
                </ProtectedRoute>
              } />
              <Route path="/calendar" element={
                <ProtectedRoute>
                  <TaskFlowLayout>
                    <Calendar />
                  </TaskFlowLayout>
                </ProtectedRoute>
              } />
              <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
