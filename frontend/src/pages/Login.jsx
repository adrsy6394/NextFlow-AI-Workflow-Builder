import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/builder" />
    </div>
  );
}
