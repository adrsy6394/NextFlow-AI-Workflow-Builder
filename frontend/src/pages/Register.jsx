import React from 'react';
import { SignUp } from '@clerk/clerk-react';

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md flex justify-center">
        <SignUp routing="path" path="/register" signInUrl="/login" fallbackRedirectUrl="/builder" />
      </div>
    </div>
  );
}
