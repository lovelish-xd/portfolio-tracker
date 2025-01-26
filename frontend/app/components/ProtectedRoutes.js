import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Signin from '../signin/page';
import Dashboard from '../dashboard/page';

// Authentication context or custom hook to check login status
const useAuth = () => {
  // Replace with your actual authentication check
  const isAuthenticated = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if token exists
  };

  return { isAuthenticated };
};

// Protected route component
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" replace />;
};

// Example usage in router setup
function AppRouter() {
  return (
    <Routes>
      <Route path="/signin" element={<Signin />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;