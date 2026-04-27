import React from 'react';
import { SignIn } from '@clerk/clerk-react';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md flex justify-center">
        <SignIn routing="path" path="/login" signUpUrl="/register" fallbackRedirectUrl="/builder" />
      </div>
    </div>
  );
}
