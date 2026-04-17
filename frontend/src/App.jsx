import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { Toaster } from 'react-hot-toast';

import Login from './pages/Login';
import Register from './pages/Register';
import Builder from './pages/Builder';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Retrieve Clerk publishable key correctly based on your initialization 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Toaster position="bottom-right" toastOptions={{ duration: 3000, style: { fontSize: '14px', borderRadius: '8px' } }} />
        <Routes>
          <Route path="/" element={<Navigate to="/builder" />} />
          <Route path="/login/*" element={<Login />} />
          <Route path="/register/*" element={<Register />} />
          <Route path="/builder" element={<ProtectedRoute><Builder /></ProtectedRoute>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
